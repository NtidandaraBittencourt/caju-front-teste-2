import { useEffect, useState } from "react";
import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import { Alert, Button, Typography } from "@mui/material";
import GenericModal from "~/components/GenericModal";
import { IFormRegistration } from "~/interfaces";
import { useUpdateMutate } from "~/hooks/useUpdateMutate";
import { Loading } from "~/components/Loading";
import { useFetch } from "~/hooks/useFetch";

const ActionRegistration = (props: IFormRegistration) => {
    const [registration, setRegistration] = useState(props.data);
    const [openModal, setOpenModal] = useState(false);
    const [infoModal, setInfoModal] = useState({});
    const [infoAlert, setInfoAlert] = useState(null);
    const [isReview, setIsReview] = useState(false);
    const [pedding, setPending] = useState(false);

    const { mutate, isSuccess, isError, isPending } = useUpdateMutate();

    const { refetch, isLoading } = useFetch();

    useEffect(() => {
        setIsReview(props.data.status === "REVIEW");
    }, [props.data.status]);

    useEffect(() => {
        if (isSuccess) {
            setInfoAlert({
                status: 'success',
                description: 'Alteração realizada com sucesso'
            });
        } else if (isError) {
            setInfoAlert({
                status: 'error',
                description: 'Não foi possível realizar a alteração, tente novamente'
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

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleActionCard = () => {
        setRegistration(prevRegistration => {
            const updatedRegistration = {
                ...prevRegistration,
                status: infoModal.status
            };
            mutate(updatedRegistration);
            return updatedRegistration;
        });
        handleCloseModal();
    };

    const reprovedCard = () => {
        setInfoModal({
            title: "Reprovar usuário",
            description: "Tem certeza que deseja reprovar o usuário?",
            button: "Reprovar",
            status: 'REPROVED'
        });
        handleOpenModal();
    };

    const reviewCard = () => {
        setInfoModal({
            title: "Revisar usuário",
            description: "Tem certeza que deseja revisar esse usuário?",
            button: "Revisar novamente",
            status: "REVIEW"
        });
        handleOpenModal();
    };

    const approvedCard = () => {
        setInfoModal({
            title: "Aprovar usuário",
            description: "Tem certeza que deseja aprovar o usuário?",
            button: "Aprovar",
            status: "APPROVED"
        });
        handleOpenModal();
    };

    return (
        <>
            {isPending || isLoading ? <Loading /> : null}
            {isReview && (
                <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={reprovedCard}>
                    Reprovar
                </ButtonSmall>
            )}
            {isReview && (
                <ButtonSmall bgcolor="rgb(155, 229, 155)" onClick={approvedCard}>
                    Aprovar
                </ButtonSmall>
            )}
            {!isReview && (
                <ButtonSmall bgcolor="#ff8858" onClick={reviewCard}>
                    Revisar novamente
                </ButtonSmall>
            )}

            <GenericModal open={openModal} onClose={handleCloseModal}>
                <Typography variant="h6" mb={2}>{infoModal.title}</Typography>
                <Typography variant="body1">{infoModal.description}</Typography>
                <S.ButtonsActions>
                    <Button variant="text" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <Button variant="contained" onClick={handleActionCard}>
                        {infoModal.button}
                    </Button>
                </S.ButtonsActions>
            </GenericModal>

            {infoAlert && (
                <Alert severity={infoAlert.status} sx={{ position: 'absolute', top: '90%' }}>
                    <Typography variant="body1">{infoAlert.description}</Typography>
                </Alert>
            )}
        </>
    );
};

export default ActionRegistration;
