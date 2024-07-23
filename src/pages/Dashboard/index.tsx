import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useFetch } from "~/hooks/useFetch";
import Empty from "./components/Empty";
import { Loading } from "~/components/Loading";
import { CardReload } from "~/components/Erros/CardReload";
import { useForm, FormProvider } from 'react-hook-form';
import { registrationValidations } from "~/utils";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [searchCpf, setSearchCpf] = useState("");
  const [searchData, setSearchData] = useState(null);

  const { data, isError, isLoading, refetch } = useFetch();
  const methods = useForm({
    resolver: registrationValidations
  })

  useEffect(() => {
    if (!searchCpf) {
      refetch();
    }
  }, [refetch, searchCpf]);

const handleSearch = (cpf, data) => {
  setSearchCpf(cpf);
  setSearchData(data);
};

const handleRefresh = () => {
  setSearchCpf("");
  setSearchData(null);
  refetch();
  methods.reset();
};
  
  return (
    <S.Container>
      {!data && !isError && <Empty />}
     
      {!isLoading && data &&
        <div>
          <FormProvider {...methods}>
            <SearchBar onSearch={handleSearch} onRefresh={handleRefresh} />
          </FormProvider>
          <Collumns registrations={searchData || data} />
        </div>
      }

      {isError && <CardReload/>}

      {isLoading && <Loading />}
    </S.Container>
  );
};
export default DashboardPage;
