
 
import { Button, Card, FAB, Text, Title } from 'react-native-paper';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useState } from 'react';

const modules = [
    {
        title: 'Agregar datos laboratorio',
        subtitle: 'Podras agregar muestras de laboratorio como toma de glucosa y tension arterial',
        image: require('../../assets/personaje1.webp'),
        color: '#dbeafe',
        index: 0,
    },
    {
        title: 'Recordatorios',
        subtitle: 'activa los recordatorio como muestras de laboratorio y control de glucosa y tension arterial',
        image: require('../../assets/logoApp.webp'),
        color: '#dcfce7',
        index: 1,
    },
    {
        title: 'Alertas',
        subtitle: 'Recordatorios',
        image: require('../../assets/google.webp'),
        color: '#fef3c7',
        index: 2,
    },
    {
        title: 'Perfil',
        subtitle: 'Mi información',
        image: require('../../assets/personaje1.webp'),
        color: '#fce7f3',
        index: 3,
    },
];

function Home({ email, name , navegation}: { email: string; name: string; navegation: (index: number) => string }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Card style={styles.doctorCard}>
                    <Card.Content style={styles.cardContent}>
                        <View style={styles.doctorHeader}>
                            <View style={styles.doctorInfo}>
                                <Title style={styles.doctorName}>¡Hola, {name}!</Title>
                            </View>

                            <Image
                                source={require('../../assets/personaje1.webp')}
                                style={styles.characterImage}
                                resizeMode="contain"
                            />
                        </View>

                        
                    </Card.Content>
                </Card>

          

                <View style={styles.modulesSection}>
                    {modules.map((item) => (
                        <Card key={item.title} style={[styles.moduleCard, { backgroundColor: item.color }]} onPress={() => navegation(item.index)}>
                            <Card.Content style={styles.moduleContent}>
                                <Image source={item.image} style={styles.moduleImage} resizeMode="contain" />
                                <View style={styles.moduleTextWrap}>
                                    <Text style={styles.moduleTitle}>{item.title}</Text>
                                    <Text style={styles.moduleSubtitle}>{item.subtitle}</Text>
                                </View>
                                
                            </Card.Content>
                        </Card>
                    ))}
                </View>

                <View style={styles.extraSpace} />
            </ScrollView>

           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 90,
    },
    doctorCard: {
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 24,
        backgroundColor: '#f8fbff',
        borderWidth: 1,
        borderColor: '#dbeafe',
        overflow: 'hidden',
        marginBottom: 16,
    },
    cardContent: {
        padding: 18,
    },
    doctorHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
    },
    doctorInfo: {
        flex: 1,
        minWidth: 0,
    },
    doctorName: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 10,
    },
    characterImage: {
        width: 150,
        height: 150,
        marginLeft: 6,
        alignSelf: 'center',
        borderRadius: 75,
    },
    actionsRow: {
        flexDirection: 'row',
        marginTop: 18,
        gap: 10,
    },
    primaryButton: {
        flex: 1,
        borderRadius: 12,
        backgroundColor: '#2563eb',
    },
    primaryButtonLabel: {
        color: '#fff',
        fontWeight: '700',
    },
    secondaryButton: {
        flex: 1,
        borderRadius: 12,
        borderColor: '#2563eb',
    },
    secondaryButtonLabel: {
        color: '#2563eb',
        fontWeight: '700',
    },
    summaryCard: {
        margin: 16,
        padding: 16,
    },
    summaryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    summaryText: {
        fontSize: 16,
        color: '#64748b',
        marginBottom: 4,
    },
    modulesSection: {
        marginHorizontal: 16,
        marginTop: 8,
        gap: 10,
    },
    moduleCard: {
        borderRadius: 18,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    moduleContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    moduleImage: {
        width: 56,
        height: 56,
        borderRadius: 14,
        marginRight: 12,
    },
    moduleTextWrap: {
        flex: 1,
    },
    moduleTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
    },
    moduleSubtitle: {
        fontSize: 12,
        color: '#475569',
        marginTop: 2,
    },
    extraSpace: {
        height: 80,
    },
    fabContainer: {
        position: 'absolute',
        right: 20,
        bottom: 28,
        alignItems: 'flex-end',
    },
    fabMenu: {
        marginBottom: 12,
        gap: 8,
        backgroundColor: 'rgba(255,255,255,0.96)',
        borderRadius: 16,
        padding: 10,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
    fab: {
        backgroundColor: '#2563eb',
        borderRadius: 28,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
});

export default Home;