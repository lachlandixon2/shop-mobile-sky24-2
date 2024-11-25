import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  IconButton,
  FAB,
  Snackbar,
  TextInput,
  Dialog,
  Portal,
  Button,
  Text,
  Surface,
  Divider,
  Searchbar,
  useTheme,
} from "react-native-paper";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchProducts, deleteProduct } from "../utils/api";

export default function ShopViewScreen(props) {
  theme = useTheme();

  const isFocused = useIsFocused();

  const [products, setProducts] = useState([]);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState("");

  const fetchData = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setOffline(true);
      setError("Unable to fetch data, offline mode");
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  // #region Navigation

  function showAddProduct(id) {
    props.navigation.navigate("ProductView", { id: -1 });
  }

  function showViewProduct(id) {
    props.navigation.navigate("ProductView", { id: id });
  }

  function showEditProduct(id) {
    props.navigation.navigate("ProductEdit", { id: id });
  }

  // #endregion

  // #region Data Handling

  function showDialog(id, name) {
    setSelectedProductId(id);
    setSelectedProductName(name);
    setVisible(true);
  }

  function hideDialog() {
    setVisible(false);
    setSelectedProductId(null);
  }

  async function handleDelete() {
    if (selectedProductId !== null) {
      try {
        const success = await deletePerson(selectedProductId);
        if (success) {
          fetchData();
          hideDialog();
        } else {
          setError("Failed to delete. Please try again.");
        }
      } catch (err) {
        console.error("Error deleting:", err);
        setError("Failed to delete. Check your connection.");
        hideDialog();
      }
    }
  }

  // #endregion

  return (
    <Surface style={{ flex: 1, padding: 16 }}>
      <Text
        variant="headlineLarge"
        style={{
          marginHorizontal: 10,
          marginBottom: 24,
          fontWeight: "bold",
          color: theme.colors.primary,
        }}
      >
        Staff Directory
      </Text>

      <ScrollView style={{ flex: 1 }}>
        {products.map((product) => (
          <View
            key={product.id}
            style={{
              flex: 1,
              flexDirection: "row",
              marginHorizontal: 10,
              marginTop: 10,
              backgroundColor: theme.colors.elevation.level2,
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 10,
              }}
            >
              {/* Avatar */}
              <TouchableOpacity onPress={() => showViewProduct(product.id)}>
                <Avatar.Icon size={48} icon="folder-open-outline" />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginLeft: 10, padding: 10 }}>
              {/* Main Content */}
              <Text variant="titleMedium">{product.name}</Text>
              <Text variant="titleMedium">{product.Category.name}</Text>
              <Text variant="titleMedium">{product.description}</Text>
            </View>
            <View>
              {/* Action Buttons */}
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <IconButton
                      icon="pencil"
                      mode="contained"
                      iconColor={theme.colors.onSecondary}
                      size={24}
                      onPress={() => {
                        showEditProduct(product.id);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <IconButton
                      icon="delete"
                      mode="contained"
                      iconColor={theme.colors.onSecondary}
                      size={24}
                      onPress={() => {
                        showDialog(product.id, product.name);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add FAB Button */}
      <FAB
        icon="plus"
        onPress={() => showAddProduct()}
        disabled={offline}
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
      />

      {/* Dialog for delete confirmation */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Confirm Deletion</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete?</Text>
            <Text style={{ fontWeight: "bold" }}>{selectedProductName}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface>
  );
}

//  <Text variant="displaySmall">ShopViewScreen</Text>

//       {products.map((product) => (
//         <Text key={product.id}>{product.name}</Text>
//       ))}

//       <Button mode="contained" icon="update" onPress={() => showViewProduct(3)}>
//         View Person no 2
//       </Button>

//       <Button mode="contained" icon="update" onPress={() => showEditProduct(5)}>
//         Edit Product no 5
//       </Button>

//       <Button mode="contained" icon="update" onPress={() => showEditProduct(-1)}>
//         Add new Product
//       </Button>

//       <Button mode="contained" icon="update" onPress={() => handleDeleteTest()}>
//         Delete Product
//       </Button>
