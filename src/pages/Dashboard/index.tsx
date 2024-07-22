import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useFetch } from "~/hooks/useFetch";
import Empty from "./components/Empty";
import { Loading } from "~/components/Loading";
import { CardReload } from "~/components/Erros/CardReload";
import { useForm, FormProvider } from 'react-hook-form';
import { registrationValidations } from "~/utils";

const DashboardPage = () => {

  const { data, isError, isLoading } = useFetch();
  const methods = useForm({
    resolver: registrationValidations
  })
  
  return (
    <S.Container>
      {!data && !isError && <Empty />}
     
      {!isLoading && data &&
        <div>
          <FormProvider {...methods}>
            <SearchBar />
          </FormProvider>
          <Collumns registrations={data} />
        </div>
      }

      {isError && <CardReload/>}

      {isLoading && <Loading />}
    </S.Container>
  );
};
export default DashboardPage;
