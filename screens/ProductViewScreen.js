import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchProductById } from '../utils/api';

export default function ProductViewScreen(props) {

  const { id } = props.route.params;

  const [product, setProduct] = useState(null);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);

  // #region Navigation

    function showShopView() {
      props.navigation.navigate("ShopView");
  }
  
  // #endregion

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        console.log(data)
      } catch (err) {
        console.error(err);
        setOffline(true);
        setError("Unable to fetch data, offline mode");
      }
    };
  
    fetchData();
  }, []);



  return (
    <Surface
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text variant="displaySmall">ProductViewScreen</Text>
      <Text>{id}</Text>
      <Text>{product?.name}</Text>
      <Text>{product?.price}</Text>
      <Text>{product?.stock}</Text>
      <Text>{product?.description}</Text>
      <Text>{product?.categoryId}</Text>

      <Button mode="contained" icon="update" onPress={() => showShopView()}>
        Go Back
      </Button>
    </Surface>
  );
}