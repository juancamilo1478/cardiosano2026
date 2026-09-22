import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Chip, Surface, Text, Title } from 'react-native-paper';

import { COLORS } from '../theme/colors';

type UserScreenProps = {
    email?: string;
    onLogout?: () => void;
};

export default function UserScreen({ email = 'usuario@cardiosano.app', onLogout }: UserScreenProps) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Surface style={styles.header} elevation={0}>
                    <Avatar.Text size={72} label="CS" color={COLORS.white} style={styles.avatar} />
                    <Title style={styles.title}>Mi perfil</Title>
                    <Text style={styles.subtitle}>{email}</Text>
                </Surface>

                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="labelLarge" style={styles.label}>Cuenta</Text>
                        <Text style={styles.info}>Estado: activa</Text>
                        <Text style={styles.info}>Método de acceso: Google</Text>
                        <Text style={styles.info}>Zona: CardioSano</Text>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content>
                        <Text variant="labelLarge" style={styles.label}>Preferencias</Text>
                        <View style={styles.chipsRow}>
                            <Chip icon="bell">Notificaciones</Chip>
                            <Chip icon="shield-check">Seguridad</Chip>
                            <Chip icon="heart-pulse">Salud</Chip>
                        </View>
                    </Card.Content>
                </Card>

                {onLogout ? (
                    <Button
                        mode="contained"
                        buttonColor={COLORS.red}
                        textColor={COLORS.white}
                        onPress={onLogout}
                        style={styles.button}
                    >
                        Cerrar sesión
                    </Button>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        padding: 20,
        gap: 16,
    },
    header: {
        backgroundColor: COLORS.white,
        borderRadius: 22,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: COLORS.primary,
        marginBottom: 12,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: COLORS.primaryDark,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.muted,
        textAlign: 'center',
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    label: {
        color: COLORS.primary,
        marginBottom: 12,
        fontWeight: '700',
    },
    info: {
        fontSize: 15,
        color: COLORS.muted,
        marginBottom: 8,
    },
    chipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8,
    },
    button: {
        borderRadius: 14,
        marginTop: 8,
    },
    title1: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.text,
    },
    title2: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.text,
    },
});
