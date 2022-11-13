import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Alert,
} from "react-native";
import { Searchbar, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MainScreen() {
  const [textInput, setTextInput] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [dataFromState, setData] = React.useState(todos);

  const searchName = (input) => {
    console.log(searchData);
    let data = dataFromState;
    let searchData = data.filter((item) => {
      return item.task.toLowerCase().includes(input.toLowerCase());
    });
    setData(searchData);
  };

  React.useEffect(() => {
    getTodosFromUserDevice();
  }, []);
  React.useEffect(() => {
    saveTodoTouserDevice(todos);
  }, [todos]);

  const ListItems = ({ todo }) => {
    return (
      <View
        style={{
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: "#EEEEEE",
            borderRadius: 12,
            height: 50,
            width: "65%",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingHorizontal: 10,
          }}
        >
          <View>
            <Text style={{ color: "#6D6D64", fontSize: 16 }}>{todo?.task}</Text>
          </View>
        </View>
        {!todo?.completed && (
          <TouchableOpacity
            style={{
              width: 50,
              aspectRatio: 1,
              borderRadius: 12,
              marginLeft: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => markTodoComplete(todo?.id)}
          >
            <Icon name="done" color={"#82CD47"} size={15} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{
            width: 50,
            aspectRatio: 1,
            borderRadius: 12,
            marginLeft: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => deleteTodo(todo?.id)}
        >
          <Icon name="delete" color={"#CF0A0A"} size={15} />
        </TouchableOpacity>
      </View>
    );
  };

  const saveTodoTouserDevice = async (todos) => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem("todos", stringifyTodos);
    } catch (e) {}
  };
  const getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      if (todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {}
  };
  const addTodo = () => {
    console.log(textInput);
    if (textInput == "") {
      Alert.alert("Error", "Please Input Your Todo List !");
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTextInput("");
    }
  };

  const markTodoComplete = (todoId) => {
    const newTodos = todos.map((item) => {
      if (item.id == todoId) {
        return { ...item, completed: true };
      }
      return item;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (todoId) => {
    const newTodos = todos.filter((item) => item.id != todoId);
    setTodos(newTodos);
  };

  const clearTodos = () => {
    Alert.alert("Confirm", "Clear All Todo ?", [
      {
        text: "Yes",
        onPress: () => setTodos([]),
      },
      { text: "No" },
    ]);
  };

  // const [searchQuery, setSearchQuery] = React.useState("");
  // const onChangeSearch = (query) => setSearchQuery(query);
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
        {/* <Text
          style={{
            fontSize: 35,
            fontWeight: "500",
            color: "#252525",
            letterSpacing: 2,
          }}
        >
          BINUS APP
        </Text> */}
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={(input) => {
            searchName(input);
          }}
          // value={searchQuery}
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
      <View style={{ width: "100%", alignItems: "flex-end", marginBottom: 20 }}>
        <TouchableOpacity onPress={clearTodos}>
          <Text style={{ color: "#CF0A0A", fontWeight: "bold" }}>
            Delete All Todo
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        data={todos}
        renderItem={({ item }) => <ListItems todo={item} />}
      />
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: "white",
          position: "absolute",
          bottom: 20,
          marginLeft: 30,
          // marginBottom: 30,
          // height: "100%",
          width: "100%",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            placeholder="Add Todo"
            value={textInput}
            onChangeText={(text) => setTextInput(text)}
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
            onPress={addTodo}
            style={{
              width: "15%",
              backgroundColor: "#252525",
              height: 50,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="add" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
