export const selectColor = (value?: string) => {
    switch (value) {
      case "major":
        return "#DE506E";
      case "minor":
        return "#74CA8F";
      case "warning":
        return "#F6C944";
      case "critical":
        return "#F06651";
    }
  };
  