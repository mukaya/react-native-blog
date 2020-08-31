import React, { useContext } from "react";
import { View, Text, FlatList, Button } from "react-native";
import BlogContext from "../context/BlogContext";

const IndexScreen = () => {
  const { data, addBlogPost } = useContext(BlogContext);
  return (
    <View>
      <Text>Index Screen</Text>
      <Button title="Add post" onPress={addBlogPost} />
      <FlatList
        data={data}
        keyExtractor={(posts) => posts.title}
        renderItem={(post) => {
          return <Text>{post.item.title}</Text>;
        }}
      />
    </View>
  );
};

export default IndexScreen;
