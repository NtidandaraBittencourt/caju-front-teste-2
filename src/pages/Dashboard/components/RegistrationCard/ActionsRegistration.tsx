import { useEffect, useState } from "react";

import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import { Alert, Button, Typography } from "@mui/material";
import GenericModal from "~/components/GenericModal";

import { IFormRegistration } from "~/interfaces";
import { useUpdateMutate } from "~/hooks/useUpdateMutate";

const  ActionRegistration = (props: IFormRegistration) => {
    const [registration, setRegistration] = useState(props.data)
    const [openModal, setOpenModal] = useState(false);

    const [infoModal, setInfoModal] = useState({});
    const [infoAlert, setInfoAlert] = useState({})

    const [isReview, setIsReview] = useState(false)


    const handleOpenModal = () => {
        setOpenModal(true);
    };
    
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        function verifyStatus() {
          if (props.data.status === "REVIEW") {
            setIsReview(true);
          } else {
            setIsReview(false);
          }
        }
    
        verifyStatus();
    
      }, [props.data]);

    const reprovedCard = () => {
        setInfoModal({
            title: "Reprovar usuário",
            description: "Tem certeza que deseja reprovar o usuário?",
            button: "Reprovar",
            status: 'REPROVED'
        })
        handleOpenModal()
    }

    const reviewCard = () => {
        setInfoModal({
            title: "Revisar usuário",
            description: "Tem certeza que deseja revisar esse usuário?",
            button: "Revisar novamente",
            status: "REVIEW"
        })
        handleOpenModal()
    }

    const approvedCard = () => {       
        setInfoModal({
            title: "Aprovar usuário",
            description: "Tem certeza que deseja aprovar o usuário?",
            button: "Aprovar",
            status: "APPROVED"
        })
        handleOpenModal()
    }

    const {mutate, isSuccess, isError} = useUpdateMutate()

    const handlActionCard = () => {
        setRegistration({
            ...registration,
            status: infoModal.status
        })
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
           {isReview && ( <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={() => reprovedCard()}>Reprovar</ButtonSmall>) }
           {isReview && ( <ButtonSmall bgcolor="rgb(155, 229, 155)" onClick={() => approvedCard()}>Aprovar</ButtonSmall>) }
           {!isReview && (<ButtonSmall bgcolor="#ff8858" onClick={() => reviewCard()}>Revisar novamente</ButtonSmall>)}
        
            <GenericModal open={openModal} onClose={handleCloseModal}>
                <Typography variant="h6" mb={2}>{infoModal.title}</Typography>
                <Typography variant="body1">{infoModal.description}</Typography>
                <S.ButtonsActions>
                    <Button variant="text" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <Button variant="contained" onClick={handlActionCard}>
                        {infoModal.button}
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

export default ActionRegistration