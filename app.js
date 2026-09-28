import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';

export default function RotaCarPassageiro() {
  const [telaAtual, setTelaAtual] = useState('mapa'); // 'mapa', 'busca' ou 'historico'
  const [destino, setDestino] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [corridaAceita, setCorridaAceita] = useState(false);

  const [historicoPassageiro] = useState([
    { id: '1', data: '27/09/2026', origem: 'Rua A, 100', destino: 'Shopping Central', valor: 'R$ 31,50', status: 'Concluída' },
    { id: '2', data: '26/09/2026', origem: 'Av. Brasil, 500', destino: 'Aeroporto', valor: 'R$ 52,00', status: 'Concluída' },
  ]);

  const chamarMotorista = () => {
    if (!destino) {
      alert('Por favor, digite o seu destino!');
      return;
    }
    setBuscando(true);
    setTimeout(() => {
      setBuscando(false);
      setCorridaAceita(true);
    }, 3000);
  };

  if (telaAtual === 'historico') {
    return (
      <View style={estilos.container}>
        <View style={estilos.headerHistorico}>
          <Text style={estilos.logoTitulo}>📅 SUAS CORRIDAS ANTERIORES</Text>
        </View>
        <ScrollView style={{ padding: 20 }}>
          {historicoPassageiro.map(item => (
            <View key={item.id} style={estilos.cardHistorico}>
              <Text style={estilos.dataItem}>📅 {item.data} - {item.status}</Text>
              <Text style={estilos.textoBranco}>De: {item.origem}</Text>
              <Text style={estilos.textoBranco}>Para: {item.destino}</Text>
              <Text style={estilos.textoDouradoMacro}>Valor: {item.valor}</Text>
            </View>
          ))}
          <TouchableOpacity style={estilos.botaoVoltar} onPress={() => setTelaAtual('mapa')}>
            <Text style={estilos.textoBotaoVoltar}>Voltar ao Mapa</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.fundoMapaSimulado}>
        <Text style={estilos.textoMapaSimulado}>🗺️ [ Radar do Passageiro - Rota Car ]</Text>
        
        {/* Posição simulada do carro a caminho */}
        <View style={[estilos.pinMotorista, { top: '45%', left: '50%' }]}>
          <Text style={estilos.iconeCarro}>🚗</Text>
          <Text style={estilos.nomeMotorista}>Carlos (A 2 min)</Text>
        </View>
      </View>

      <View style={estilos.painelRodape}>
        <Text style={estilos.tituloPainel}>Para onde você quer ir hoje?</Text>
        
        <TextInput 
          style={estilos.inputDestino} 
          placeholder="Digite seu destino..." 
          placeholderTextColor="#666"
          value={destino}
          onChangeText={setDestino}
        />

        {buscando ? (
          <View style={estilos.botaoBuscando}>
            <Text style={estilos.textoBotaoAcao}>Procurando motorista próximo...</Text>
          </View>
        ) : corridaAceita ? (
          <View style={estilos.botaoConfirmado}>
            <Text style={estilos.textoBotaoAcao}>Motorista a caminho! 🚗</Text>
          </View>
        ) : (
          <TouchableOpacity style={estilos.botaoChamar} onPress={chamarMotorista}>
            <Text style={estilos.textoBotaoAcao}>Chamar Rota Car</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={estilos.botaoHistoricoRodape} onPress={() => setTelaAtual('historico')}>
          <Text style={estilos.textoBotaoHistorico}>📅 Ver Histórico de Corridas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  fundoMapaSimulado: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#181A20', justifyContent: 'center', alignItems: 'center' },
  textoMapaSimulado: { color: '#666', fontSize: 14, fontWeight: 'bold', position: 'absolute', top: 60 },
  pinMotorista: { position: 'absolute', alignItems: 'center' },
  iconeCarro: { fontSize: 30 },
  nomeMotorista: { color: '#D4AF37', fontSize: 11, fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.8)', paddingHorizontal: 6, borderRadius: 3, marginTop: 2 },
  painelRodape: { position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: '#1E1E1E', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#333' },
  tituloPainel: { color: '#D4AF37', fontSize: 16, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  inputDestino: { backgroundColor: '#121212', color: '#FFF', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#444' },
  botaoChamar: { backgroundColor: '#D4AF37', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  botaoBuscando: { backgroundColor: '#333', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  botaoConfirmado: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  textoBotaoAcao: { color: '#121212', fontWeight: 'bold', fontSize: 15 },
  botaoHistoricoRodape: { backgroundColor: '#252525', padding: 10, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#D4AF37' },
  textoBotaoHistorico: { color: '#D4AF37', fontWeight: 'bold', fontSize: 13 },
  headerHistorico: { marginTop: 50, paddingHorizontal: 20, marginBottom: 10, alignItems: 'center' },
  logoTitulo: { color: '#D4AF37', fontSize: 15, fontWeight: 'bold', letterSpacing: 1 },
  cardHistorico: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  dataItem: { color: '#D4AF37', fontSize: 12, fontWeight: 'bold', marginBottom: 4 },
  textoBranco: { color: '#FFF', fontSize: 14, marginBottom: 2 },
  textoDouradoMacro: { color: '#D4AF37', fontSize: 14, fontWeight: 'bold', marginTop: 4 },
  botaoVoltar: { backgroundColor: '#D4AF37', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, marginBottom: 40 },
  textoBotaoVoltar: { color: '#121212', fontWeight: 'bold', fontSize: 15 },
});
