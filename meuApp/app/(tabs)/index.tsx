import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 8 caracteres');
      return;
    }
    Alert.alert('Sucesso', 'Login realizado com sucesso!');
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Login com Google em desenvolvimento');
  };

  const handleAppleLogin = () => {
    Alert.alert('Apple Login', 'Login com Apple em desenvolvimento');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Image 
                source={require("@/assets/images/logo2.jpeg")} 
                style={styles.logoImage} 
              />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>
            Faça parte da{'\n'}mudança
          </Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
            <Image 
                source={require("@/assets/images/imagem-google.png")} 
                style={styles.googleImage} 
              />
              <Text style={styles.socialButtonText}>Entrar com Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton} onPress={handleAppleLogin}>
              <Ionicons name="logo-apple" size={20} color="#000" />
              <Text style={styles.socialButtonText}>Entrar com Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Links */}
          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.linkText}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#20B2AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 34,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#20B2AA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    
  },
  socialContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    
  },
  socialButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  socialButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  linksContainer: {
    alignItems: 'center',
    
  },
  linkText: {
    color: '#333',
    fontSize: 14,
    marginBottom: 12,
    textDecorationLine: 'none',
  },
  googleImage: {
    width: 20,
    height: 20,
  },
});