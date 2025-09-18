import { openDatabase } from "expo-sqlite";

// Abre (ou cria) o banco
const db = openDatabase("meuBanco.db");

// Criar tabela de usuários
export const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT UNIQUE, senha TEXT);"
    );
  });
};

// Inserir usuário (para cadastro ou testes)
export const addUser = (nome, email, senha) => {
  db.transaction((tx) => {
    tx.executeSql("INSERT INTO users (nome, email, senha) VALUES (?, ?, ?);", [
      nome,
      email,
      senha,
    ]);
  });
};

// Validar login
export const loginUser = (email, senha, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM users WHERE email = ? AND senha = ?;",
      [email, senha],
      (_, { rows }) => {
        if (rows.length > 0) {
          callback(true, rows._array[0]); // Encontrou usuário
        } else {
          callback(false, null); // Não encontrou
        }
      }
    );
  });
};

export default db;
