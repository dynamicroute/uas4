import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Searchbar, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function MainScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        paddingHorizontal: 30,
        paddingVertical: 40,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 35,
            fontWeight: "500",
            color: "#252525",
            letterSpacing: 2,
          }}
        >
          BINUS APP
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{
            borderRadius: 12,
            shadowColor: "transparent",
            backgroundColor: "#EEEEEE",
            width: "80%",
            height: 50,
          }}
        />
        <TouchableOpacity
          style={{
            width: "15%",
            backgroundColor: "#EEEEEE",
            height: 50,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="sort" size={20} color="#6D6D64" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          position: "absolute",
          bottom: 20,
          marginLeft: 30,
          // marginBottom: 30,
          // height: "100%",
          width: "100%",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            underlineColor="transparent"
            selectionColor="#252525"
            activeUnderlineColor="transparent"
            style={{
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              borderRadius: 12,
              height: 50,
              width: "80%",
              backgroundColor: "#EEEEEE",
              // paddingVertical: 10,
              marginBottom: 10,
            }}
          ></TextInput>
          <TouchableOpacity
            style={{
              width: "15%",
              backgroundColor: "#EEEEEE",
              height: 50,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="add" size={20} color="#6D6D64" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
