import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPost } = useContext(Context);

  useEffect(() => {
    getBlogPost();
    const listener = navigation.addListener("didFocus", () => {
      getBlogPost();
    });
    return () => {
      listener.remove();
    };
  }, []);
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          borderColor: "grey",
          borderWidth: 1,
          marginVertical: 10,
          marginHorizontal: 10,
          backgroundColor: "white",
          padding: 5,
        }}
      >
        All Posts
      </Text>
      <FlatList
        data={state}
        renderItem={(post) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: post.item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {post.item.title} - {post.item.id}
                </Text>
                <TouchableOpacity onPress={() => deleteBlogPost(post.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(post) => post.id}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#C4C4C4",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
    color: "red",
  },
});
export default IndexScreen;
