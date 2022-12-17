import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { CidadesService } from "../../shared/services/api/cidades/CidadesService"
import { VForm, VTextField, useVForm, IVFormErrors } from "../../shared/forms"
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material"

import * as yup from "yup"

interface IFormData {
    nome: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    nome: yup.string().required('Campo é obrigatório').min(3, 'O campo precisa ter pelo menos 3 caracteres')
})

export const DetalheDeCidades: React.FC = () => {
    const { id } = useParams<'id'>()
    const navigate = useNavigate()

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm()

    const [ isLoading, setIsLoading ] = useState(false)
    const [ nome, setNome ] = useState('')

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true)

            CidadesService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false)

                    if (result instanceof Error) {
                        alert(result.message)
                        navigate('/cidades')
                    } 
                    else {
                        setNome(result.nome)
                        formRef.current?.setData(result)
                    }
                })
        }
        else {
            formRef.current?.setData({
                nome: ''
            })
        }
    }, [id])

    const handleSave = (dados: IFormData) => {

        formValidationSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValidados) => {

                setIsLoading(true)

                if (id === 'nova') {
                    
                    CidadesService
                        .create(dados)
                        .then((result) => {
                            setIsLoading(false)
        
                            if (result instanceof Error) {
                                alert(result.message)
                            }
                            else {
                                if (isSaveAndClose()) {
                                    navigate('/cidades')
                                } else {
                                    navigate(`/cidades/detalhe/${result}`)
                                }
                            }
                        })
        
                } else {
                    
                    CidadesService
                        .updateById(Number(id), { id: Number(id), ...dados })
                        .then((result) => {
                            setIsLoading(false)
        
                            if (result instanceof Error) {
                                alert(result.message)
                            }
                            else {
        
                                if (isSaveAndClose()) {
                                    navigate('/cidades')
                                } 
        
                            }
                    })
        
                }

            })
            .catch((errors: yup.ValidationError) => {

                const validationErrors: IVFormErrors = {}

                errors.inner.forEach(error => {
                    if (!error.path) return

                    validationErrors[error.path] = error.message
                })

                formRef.current?.setErrors(validationErrors)
            })
    }

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {
            CidadesService.deleteById(id)
              .then((result) => {
                if (result instanceof Error) {
                  alert(result.message)
                }
                else {
                  alert('Registro apagado com sucesso!')
                  navigate('/cidades')
                }
              })
          }
    }

    return (
        <LayoutBaseDePagina
            titulo={ id === 'nova' ? 'Nova cidade' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarEmVoltar={() => { navigate('/cidades') }}
                    aoClicarEmApagar={() => handleDelete(Number(id)) }
                    aoClicarEmSalvar={ save }
                    aoClicarEmNovo={() => { navigate('/cidades/detalhe/nova') }}
                    aoClicarEmSalvarEFechar={ saveAndClose }
                />
            }
        >

            <VForm ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">

                    <Grid container direction="column" padding={2} spacing={2}>

                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant="indeterminate" />
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant="h6">Geral</Typography>
                        </Grid>

                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
                                <VTextField 
                                    fullWidth
                                    label='Nome' 
                                    name='nome' 
                                    disabled={isLoading}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    
                    </Grid>

                </Box>

            </VForm>

        </LayoutBaseDePagina>
    )
}
