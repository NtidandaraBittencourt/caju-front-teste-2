import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar
} from "react-icons/hi";

import ActionRegistration from "./ActionsRegistration";
import RemoveRegistration from "./RemoveRegistration";
import { IFormRegistration } from "~/interfaces";

type Props = {
  data: IFormRegistration;
};

const RegistrationCard = (props: Props) => {
  const {employeeName, email, admissionDate } = props.data
  
  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        <ActionRegistration data={props.data}/>
        <RemoveRegistration registration={props.data.id}/>       
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
