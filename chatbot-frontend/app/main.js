import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from './config';



export default function Chatbot() {
  const [context, setContext] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!context.trim() || !question.trim()) {
      Alert.alert('Error', 'Please enter both context and question');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/ask`, {   // <-- Use config here
        context,
        question,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer('Error fetching answer. Check your backend and network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chatbot QA Tamil Example</Text>

      <Text style={styles.label}>Context</Text>
      <TextInput
        style={[styles.input, { height: 120 }]}
        multiline
        value={context}
        onChangeText={setContext}
        placeholder="உள்ளடக்கம் இங்கு இடவும்..."
        textAlignVertical="top"
      />

      <Text style={styles.label}>Question</Text>
      <TextInput
        style={styles.input}
        value={question}
        onChangeText={setQuestion}
        placeholder="கேள்வியை இங்கு இடவும்..."
      />

      <Button title={loading ? "Loading..." : "Get Answer"} onPress={handleAsk} disabled={loading} />

      <Text style={styles.label}>Answer</Text>
      <View style={styles.answerBox}>
        <Text style={{ fontSize: 18 }}>{answer}</Text>
      </View>
    </ScrollView>
  );
}

// Your styles remain unchanged
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    marginTop: 20,
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  answerBox: {
    marginTop: 12,
    padding: 15,
    backgroundColor: '#e6f2ff',
    borderRadius: 8,
    minHeight: 60,
    justifyContent: 'center',
  },
});
