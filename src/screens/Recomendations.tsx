import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Chip, Text, Title } from 'react-native-paper';

const recommendations = [
  {
    title: 'Actividad ligera',
    subtitle: '30 minutos diarios de caminata suave',
    accent: '#2563eb',
  },
  {
    title: 'Sueño reparador',
    subtitle: 'Mantén horarios regulares y evita pantallas antes de dormir',
    accent: '#14b8a6',
  },
  {
    title: 'Control de estrés',
    subtitle: 'Respiración profunda y pausas breves durante la jornada',
    accent: '#f59e0b',
  },
];

export default function RecommendationsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>Recomendaciones</Title>
        <Text style={styles.subtitle}>Sugerencias para mejorar tu bienestar diario.</Text>

        <View style={styles.chipsRow}>
          <Chip icon="heart-pulse">Cardio</Chip>
          <Chip icon="sleep">Dormir</Chip>
          <Chip icon="run-fast">Activo</Chip>
        </View>

        {recommendations.map((item) => (
          <Card key={item.title} style={[styles.card, { borderColor: item.accent }]}>
            <Card.Content>
              <Text variant="labelLarge" style={[styles.badge, { color: item.accent }]}>
                {item.title}
              </Text>
              <Text style={styles.cardText}>{item.subtitle}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eef6ff',
  },
  container: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#14213d',
  },
  subtitle: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 4,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderLeftWidth: 6,
  },
  badge: {
    marginBottom: 8,
    fontWeight: '700',
  },
  cardText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
});
