import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../init/themes/theme_context";
import { RootState } from "../../store/Store";
import { useSelector } from "react-redux";

const NumberPagination = ({
  totalAlerts,
  currentPage,
  setCurrentPage,
}: {
  totalAlerts: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { theme } = useTheme();
  const main = useSelector((state: RootState) => state.main);

  const [pages, setPages] = useState<number[]>([]);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(6);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const pageNumberLimit = 6;

  useEffect(() => {
    if (currentPage < pages.length) {
      handlePrevFirst();
    }
    const totalPage = Number(totalAlerts / 10);
    let pagesC: number[] = [];
    for (let i = 1; i <= totalPage + 1; i++) {
      pagesC.push(i);
    }
    setPages(pagesC);
  }, [totalAlerts, main.selectCompany]);

  /*PAGINATION BUTTON SECTION:: START*/
  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handlePrevFirst = () => {
    setCurrentPage(1);
    setmaxPageNumberLimit(pageNumberLimit);
    setminPageNumberLimit(0);
  };

  const handleNextLast = () => {
    setCurrentPage(pages[pages.length - 1]);
    setmaxPageNumberLimit(pages[pages.length - 1]);
    setminPageNumberLimit(pages[pages.length - 1] - pageNumberLimit);
  };
  //PAGINATION :: END
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          handlePrevFirst();
        }}
      >
        <MaterialIcons
          name="keyboard-double-arrow-left"
          size={24}
          color={theme.palette.background.opposite}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          handlePrevbtn();
        }}
        disabled={currentPage === 1 ? true : false}
      >
        <MaterialIcons
          name="keyboard-arrow-left"
          size={24}
          color={theme.palette.background.opposite}
        />
      </Pressable>

      {pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <View key={number}>
              <Button
                color={
                  number === currentPage
                    ? theme.palette.error?.main
                    : theme.palette.background.opposite
                }
                title={`${number}`}
                onPress={() => setCurrentPage(number)}
              />
            </View>
          );
        } else {
          return null;
        }
      })}
      <Pressable
        onPress={() => {
          handleNextbtn();
        }}
        disabled={currentPage === pages[pages.length - 1] ? true : false}
      >
        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          color={theme.palette.background.opposite}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          handleNextLast();
        }}
      >
        <MaterialIcons
          name="keyboard-double-arrow-right"
          size={24}
          color={theme.palette.background.opposite}
        />
      </Pressable>
    </View>
  );
};

export default NumberPagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
