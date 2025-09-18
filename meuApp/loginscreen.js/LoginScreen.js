import { setupDatabase, addUser, loginUser } from "../src/database.js/database";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    // Configura o banco de dados e cria tabela
    setupDatabase();

    // Insere um usuário de teste (somente se quiser adicionar sempre que iniciar)
    addUser("João da Silva", "teste@email.com", "123456");
  }, []);

  const handleLogin = () => {
    loginUser(email, senha, (success, user) => {
      if (success) {
        Alert.alert("Login realizado!", `Bem-vindo, ${user.nome}`);
      } else {
        Alert.alert("Erro", "Email ou senha inválidos.");
      }
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        value={email}
        onChangeText={setEmail}
      />

      <Text>Senha</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

