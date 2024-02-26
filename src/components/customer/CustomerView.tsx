import React, { useEffect } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { useTheme } from "../../init/themes/theme_context";
import { AppDispatch, RootState } from "../../store/Store";
import { useDispatch, useSelector } from "react-redux";
import ModalSelector from "react-native-modal-selector";
import { setSelectCompany } from "../../store/slice/MainSlice";

const CustomerView = () => {
  const { theme } = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const main = useSelector((state: RootState) => state.main);
  const companyArr = main.companies;

  /*   const {
    data: companyName = {} as IPermmissionsData[],
    isLoading,
    isError,
  } = useGetCustomerQuery();
  const companyArr = companyName?.map((item) => {
    return { label: item.customer_name, value: item.customer_id };
  }); */

  return (
    <View>
      {companyArr.length !== 0 && main.selectCompany !== undefined && (
        <ModalSelector
          data={companyArr}
          key={`key_1`}
          keyExtractor={(item) => `key_${item.label}`}
          labelExtractor={(item) => item.label}
          initValue={main.selectCompany.label}
          onChange={(option) => {
            dispatch(setSelectCompany(option));
          }}
        >
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 8,
              borderColor: theme.palette.text?.disabled,
              color: theme.palette.background.opposite,
              backgroundColor: theme.palette.background.default,
              padding: 10,
              height: 36,
            }}
            editable={false}
            placeholder="Select!"
            value={main.selectCompany.label}
          />
        </ModalSelector>
      )}
    </View>
  );
  /*  if (isLoading === true) {
    <Text>Loading...</Text>;
  } else if (isError === true) {
    <Text>Error...</Text>;
  } else if (companyName !== undefined) {
   
  } */
};

export default CustomerView;
