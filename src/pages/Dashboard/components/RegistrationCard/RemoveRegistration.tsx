import { Alert, Button, Typography } from "@mui/material";
import { HiOutlineTrash } from "react-icons/hi";
import GenericModal from "~/components/GenericModal";
import * as S from "./styles";
import { useDeleteMutate } from "~/hooks/useDeleteMutate";
import { useEffect, useState } from "react";
import { Loading } from "~/components/Loading";
import { useFetch } from "~/hooks/useFetch";

const  RemoveRegistration = ({registration}: string) => {
    const [openModal, setOpenModal] = useState(false);
    const [infoAlert, setInfoAlert] = useState({})
    const [pedding, setPending] = useState(false);

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
    const { refetch, isLoading } = useFetch();

    const handleDeleteCard = () => {
        mutate(registration)
        handleCloseModal()
    }

    useEffect(() => {
        if (isSuccess) {
            setInfoAlert({
                status: 'success',
                description: 'Registro excluido com sucesso!'
            });
        } else if (isError) {
            setInfoAlert({
                status: 'error',
                description: 'Não foi possível excluir registro.'
            });
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        if (infoAlert) {
            handleRefetch()
        }
    }, [infoAlert]);

    const handleRefetch = () => {
        setPending(true);
        setTimeout(() => {
            refetch(); 
            setPending(false);
        }, 2000); 
    };

    return (
            <>
                {isLoading && <Loading />}
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

    
    export default RemoveRegistration