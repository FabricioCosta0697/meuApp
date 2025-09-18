import * as React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

// ---------- TIPOS ----------
type AccountType = 'voluntario' | 'igreja';

// ---------- FUNÇÕES AUXILIARES ----------
const onlyDigits = (str: string = ''): string => str.replace(/\D/g, '');

// Formata CPF ou CNPJ
const formatCPForCNPJ = (value: string, type: AccountType): string => {
  const digits = onlyDigits(value);

  if (type === 'voluntario') {
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    return digits
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }
};

// Formata Telefone (XX) XXXXX-XXXX
const formatPhone = (value: string): string => {
  const digits = onlyDigits(value);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

// Formata CEP XXXXX-XXX
const formatCEP = (value: string): string => {
  const digits = onlyDigits(value);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
};

// Valida CPF
const validateCPF = (cpf: string): boolean => {
  const numbers: string = onlyDigits(cpf);
  if (numbers.length !== 11) return false;
  if (/^(\d)\1+$/.test(numbers)) return false;

  const nums: number[] = numbers.split('').map(Number);

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += nums[i] * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  if (rest !== nums[9]) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += nums[i] * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  return rest === nums[10];
};

// Valida CNPJ
const validateCNPJ = (cnpj: string): boolean => {
  const numbers: string = onlyDigits(cnpj);
  if (numbers.length !== 14) return false;
  if (/^(\d)\1+$/.test(numbers)) return false;

  const nums: number[] = numbers.split('').map(Number);
  const weights1: number[] = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2: number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 12; i++) sum += nums[i] * weights1[i];
  let rest = sum % 11;
  let check1 = rest < 2 ? 0 : 11 - rest;
  if (check1 !== nums[12]) return false;

  sum = 0;
  for (let i = 0; i < 13; i++) sum += nums[i] * weights2[i];
  rest = sum % 11;
  let check2 = rest < 2 ? 0 : 11 - rest;
  return check2 === nums[13];
};

// ---------- COMPONENTE PRINCIPAL ----------
const RegisterScreen: React.FC = () => {
  const [accountType, setAccountType] = useState<AccountType>('voluntario');
  const [fullName, setFullName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [cep, setCep] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // Atualiza CPF/CNPJ formatado
  const handleCPFChange = (text: string): void => {
    const formatted = formatCPForCNPJ(text, accountType);
    setCpf(formatted);
  };

  // Atualiza telefone formatado
  const handlePhoneChange = (text: string): void => {
    const formatted = formatPhone(text);
    setPhone(formatted);
  };

  // Atualiza CEP formatado
  const handleCEPChange = (text: string): void => {
    const formatted = formatCEP(text);
    setCep(formatted);
  };

  // ---------- CADASTRO ----------
  const handleRegister = (): void => {
    if (!fullName || !cpf || !phone || !cep || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (accountType === 'voluntario' && !validateCPF(cpf)) {
      Alert.alert('Erro', 'CPF inválido');
      return;
    }

    if (accountType === 'igreja' && !validateCNPJ(cpf)) {
      Alert.alert('Erro', 'CNPJ inválido');
      return;
    }

    if (phone.length < 14) {
      Alert.alert('Erro', 'Telefone inválido');
      return;
    }

    if (cep.length < 9) {
      Alert.alert('Erro', 'CEP inválido');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      {/* Tipo de conta */}
      <View style={styles.accountTypeContainer}>
        <TouchableOpacity
          style={[
            styles.accountTypeButton,
            accountType === 'voluntario' && styles.activeButton,
          ]}
          onPress={() => { setAccountType('voluntario'); setCpf(''); }}
        >
          <Text
            style={[
              styles.accountTypeText,
              accountType === 'voluntario' && styles.activeButtonText,
            ]}
          >
            Voluntario
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.accountTypeButton,
            accountType === 'igreja' && styles.activeButton,
          ]}
          onPress={() => { setAccountType('igreja'); setCpf(''); }}
        >
          <Text
            style={[
              styles.accountTypeText,
              accountType === 'igreja' && styles.activeButtonText,
            ]}
          >
            Igreja
          </Text>
        </TouchableOpacity>
      </View>

      {/* Nome completo */}
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#999"
        value={fullName}
        onChangeText={setFullName}
        autoCapitalize="words"
      />

      {/* CPF ou CNPJ */}
      <TextInput
        style={[
          styles.input,
          cpf.length > 0 &&
          (accountType === 'voluntario'
            ? !validateCPF(cpf)
            : !validateCNPJ(cpf))
            ? { borderColor: 'red', borderWidth: 1 }
            : null,
        ]}
        placeholder={accountType === 'voluntario' ? 'CPF' : 'CNPJ'}
        placeholderTextColor="#999"
        value={cpf}
        onChangeText={handleCPFChange}
        keyboardType="numeric"
        maxLength={accountType === 'voluntario' ? 14 : 18}
      />

      {/* Telefone */}
      <TextInput
        style={[
          styles.input,
          phone.length > 0 && phone.length < 14 ? { borderColor: 'red', borderWidth: 1 } : null,
        ]}
        placeholder="Telefone"
        placeholderTextColor="#999"
        value={phone}
        onChangeText={handlePhoneChange}
        keyboardType="phone-pad"
        maxLength={15}
      />

      {/* CEP */}
      <TextInput
        style={[
          styles.input,
          cep.length > 0 && cep.length < 9 ? { borderColor: 'red', borderWidth: 1 } : null,
        ]}
        placeholder="CEP"
        placeholderTextColor="#999"
        value={cep}
        onChangeText={handleCEPChange}
        keyboardType="numeric"
        maxLength={9}
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Confirmar Senha */}
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#999"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Botão de cadastro */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

// ---------- ESTILOS ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  accountTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  accountTypeButton: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activeButton: {
    backgroundColor: '#20B2AA',
    borderColor: '#20B2AA',
  },
  activeButtonText: {
    color: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#20B2AA',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
