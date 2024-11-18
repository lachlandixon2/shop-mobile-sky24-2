import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchProductById, addProduct, updateProduct } from "../utils/api";

export default function ProductEditScreen(props) {

  const { id } = props.route.params;

  const [product, setProduct] = useState(
    {
    "id": 0,
    "name": "",
    "price": 0,
    "stock": 0,
    "description": "",
    "categoryId": 1,
    }
  );
    const [offline, setOffline] = useState(false);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== -1) {
          const data = await fetchProductById(id);
          setProduct(data);
          console.log(data);
        } else {
          console.log(product);
          }
      } catch (err) {
        console.error(err);
        setOffline(true);
        setError("Unable to fetch data, offline mode");
      }
    };

    fetchData();
  }, []);

    function showShopView() {
      props.navigation.navigate("ShopView")
  }
  
    async function handleSubmit() {
      try {
        if (id === -1) {
          await addProduct(person);
        } else {
          await updateProduct(id, person);
        }
        props.navigation.goBack();
      } catch (err) {
        console.error(err);
        setError("Failed to save data.");
      }
  };
  
    async function handleSubmitTest() {
      try {
        if (id === -1) {
          await addProduct({
            name: "New Banana",
            price: 3.3,
            stock: 999,
            description: "Fresh yellow banana",
            categoryId: 1,
          });
        } else {
          await updateProduct(id, { ...product, name: product.name + " Updated" });
        }
        props.navigation.goBack();
      } catch (err) {
        console.error(err);
        setError("Failed to save data.");
      }
    }



  return (
    <Surface
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text variant="displaySmall">ProductEditScreen</Text>
      <Text>{id}</Text>
      <Text>{product?.name}</Text>
      <Text>{product?.price}</Text>
      <Text>{product?.stock}</Text>
      <Text>{product?.description}</Text>
      <Text>{product?.categoryId}</Text>

      <Button mode="contained" icon="update" onPress={() => showShopView()}>
        Go Back
      </Button>
      <Button mode="contained" icon="update" onPress={() => handleSubmitTest()}>
        Save or New
      </Button>
    </Surface>
  );
}