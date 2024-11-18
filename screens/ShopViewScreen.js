import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchProducts, deleteProduct } from "../utils/api";

export default function ShopViewScreen(props) {

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
  function showViewProduct(id) {
    props.navigation.navigate("ProductView", {id: id});
  }

    function showEditProduct(id) {
      props.navigation.navigate("ProductEdit", { id: id });
  }
  
  function handleDelete(id) {
    props.navigation.navigate("ProductEdit", { id: id });
  }
  
    // #endregion


  async function handleDelete() {
    if (selectedProductId !== null) {
      try {
        const success = await deleteProduct(selectedProductId);
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

    async function handleDeleteTest() {
      const lastProduct = products[products.length - 1].id;
      try {
        const success = await deleteProduct(lastProduct);
        if (success) {
          fetchData();
        } else {
          setError("Failed to delete. Please try again.");
        }
      } catch (err) {
        console.error("Error deleting:", err);
        setError("Failed to delete. Check your connection.");
      }
    }

  return (
    <Surface
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text variant="displaySmall">ShopViewScreen</Text>

      {products.map((product) => (
        <Text key={product.id}>{product.name}</Text>
      ))}

      <Button mode="contained" icon="update" onPress={() => showViewProduct(3)}>
        View Person no 2
      </Button>

      <Button mode="contained" icon="update" onPress={() => showEditProduct(5)}>
        Edit Product no 5
      </Button>

      <Button mode="contained" icon="update" onPress={() => showEditProduct(-1)}>
        Add new Product
      </Button>

      <Button mode="contained" icon="update" onPress={() => handleDeleteTest()}>
        Delete Product
      </Button>
    </Surface>
  );
}