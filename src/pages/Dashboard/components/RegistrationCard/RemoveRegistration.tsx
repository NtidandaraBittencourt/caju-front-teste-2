import { Alert, Button, Typography } from "@mui/material";
import { HiOutlineTrash } from "react-icons/hi";
import GenericModal from "~/components/GenericModal";
import * as S from "./styles";
import { useDeleteMutate } from "~/hooks/useDeleteMutate";
import { useEffect, useState } from "react";

const  removeRegistration = ({registration}: string) => {
    const [openModal, setOpenModal] = useState(false);
    const [infoAlert, setInfoAlert] = useState({})

    const handleOpenModal = () => {
        setOpenModal(true);
    };
    
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const removeCard = () => {
        handleOpenModal()
    }

    const { mutate, isSuccess, isError } = useDeleteMutate()

    const handleDeleteCard = () => {
        console.log('delete', registration)

        mutate(registration)
    }

    useEffect(() =>{
        handleCloseModal()
        setInfoAlert({
            status: 'success',
            description: 'Alteração realizada com sucesso'
        })
    },[isSuccess])

    useEffect(() => {
        handleCloseModal()
        setInfoAlert({
            status: 'error',
            description: 'Não foi possivel realizar alteração, tente novamente'
        })
    },[isError])

    return (
            <>
                <HiOutlineTrash onClick={removeCard}/>
            
                <GenericModal open={openModal} onClose={handleCloseModal}>
                    <Typography variant="h6" mb={2}> Deletar usuário </Typography>
                    <Typography variant="body1"> Tem certeza que deseja excluir? </Typography>
                    <S.ButtonsActions>
                        <Button variant="text" onClick={handleCloseModal}>
                            Fechar
                        </Button>
                        <Button variant="contained" onClick={handleDeleteCard}>
                            Excluir
                        </Button>
                    </S.ButtonsActions>
                </GenericModal>
    
                {isError ||isSuccess ? (
                    <Alert severity={infoAlert.status} sx={{position: 'absolute', top: '90%'}}>
                        <Typography variant="body1">{infoAlert.description}</Typography>
                    </Alert>
                ): null}
            </>
        
        )
    }

    
    export default removeRegistration