import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Appbar, BottomNavigation, Button, Card, Text, Title } from 'react-native-paper';
import { COLORS } from '../theme/colors';
import { DashboardScreenProps } from './AppScreens';
import UserScreen from './User';

// ########################## componentes######################################
import Home from './Home';

export function DashboardScreen({ email, onLogout, user, image }: DashboardScreenProps) {
    const [index, setIndex] = useState(0);
    const avatarUrl =
        image ??
        user?.user_metadata?.avatar_url ??
        user?.user_metadata?.picture ??
        null;

 
    // Define the routes for the bottom navigation
    const routes = [
        { key: 'home', title: 'Inicio', icon: 'home' },
        { key: 'sintomas', title: 'Síntomas', icon: 'heart-pulse' },
        { key: 'Laboratorios', title: 'Laboratorios', icon: 'flask' },
        { key: 'Recordatorios', title: 'recordatorios', icon: 'bell' }
    ];

    const renderIcon = ({ route, color, focused }: { route: { key: string; title: string; icon: string }; color: string; focused: boolean }) => {
        const iconName = route.key === 'home' ? 'home' : route.key === 'perfil' ? 'account' : route.key === 'sintomas' ? 'heart-pulse' : route.key === 'Laboratorios' ? 'flask' : route.key === 'Recordatorios' ? 'bell' : 'home';
        const iconSize = focused ? 24 : 22;

        return <MaterialCommunityIcons name={iconName as any} size={iconSize} color={color} />;
    };

 

    const renderPerfil = () => <UserScreen email={email} onLogout={onLogout} />;
    const renderSintomas = () => (
        <View style={styles.dashboardContainer}>
            <Card style={styles.heroCard}>
                <Card.Content>
                    <Text variant="labelLarge" style={styles.heroBadge}>Activo</Text>
                    <Title style={styles.heroTitle}>Síntomas</Title>
                    <Text style={styles.heroText}>Aquí puedes registrar y consultar tus síntomas.</Text>
                </Card.Content>
            </Card>
        </View>
    );
    const renderLaboratorios = () => (
        <View style={styles.dashboardContainer}>
            <Card style={styles.heroCard}>
                <Card.Content>
                    <Text variant="labelLarge" style={styles.heroBadge}>Activo</Text>
                    <Title style={styles.heroTitle}>Laboratorios</Title>
                    <Text style={styles.heroText}>Aquí puedes registrar y consultar tus resultados de laboratorio.</Text>
                </Card.Content>
            </Card>
        </View>
    );

    const renderRecordatorios = () => (
        <View style={styles.dashboardContainer}>
            <Card style={styles.heroCard}>
                <Card.Content>
                    <Text variant="labelLarge" style={styles.heroBadge}>Activo</Text>
                    <Title style={styles.heroTitle}>Recordatorios</Title>
                    <Text style={styles.heroText}>Aquí puedes gestionar tus recordatorios.</Text>
                </Card.Content>
            </Card>
        </View>
    );
    const navegationModules=(index: number) => {
        switch(index) {
            case 0:
                return 'home';
            case 1:
                return 'perfil';
            case 2:
                return 'sintomas';
            case 3:
                return 'Laboratorios';
            case 4:
                return 'Recordatorios';
            default:
                return 'home';
        }
    };

    const renderScene = BottomNavigation.SceneMap({
        home: () => <Home email={email}  name={user?.user_metadata?.full_name ?? 'Usuario'} navegation={navegationModules} />,
        perfil: renderPerfil,
        sintomas: renderSintomas,
        Laboratorios: renderLaboratorios,
        Recordatorios: renderRecordatorios,             
    });

    const headerTitle = index === 0 ? 'Inicio' : 'Perfil';

    return (
        <View style={styles.screenWrap}>
            {index === 0 && (
                <Appbar.Header>

                    <Appbar.Content title={`Bienvenido ${email}`} />
                   
                    <Appbar.Action
                        onPress={() => {
                            setIndex(1);

                        }}
                        icon={() =>
                            avatarUrl ? (
                                <Image
                                    source={{ uri: avatarUrl }}
                                    style={{ width: 32, height: 32, borderRadius: 16 }}
                                />
                            ) : (
                                <MaterialCommunityIcons name="account-circle" size={28} color={COLORS.white} />
                            )
                        }
                    />
         
                    <Appbar.Action icon="logout" onPress={() => { onLogout(); }} />

                </Appbar.Header>
            )}

            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                renderIcon={renderIcon}
                barStyle={styles.bottomBar}
                activeColor={COLORS.violet}
                inactiveColor={COLORS.info}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screenWrap: {
        flex: 1,
    },
    headerBar: {
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        marginBottom: 8,
    },
    appBarTitle: {
        color: COLORS.white,
        fontWeight: '700',
    },
    appBarSubtitle: {
        color: '#dbeafe',
    },
    dashboardContainer: {
        flex: 1,
        gap: 16,
        paddingHorizontal: 8,
        paddingTop: 8,
        paddingBottom: 12,
    },
    heroCard: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        overflow: 'hidden',
    },
    heroBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#dbeafe',
        color: '#1e3a8a',
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginBottom: 12,
        fontWeight: '700',
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.white,
        marginBottom: 8,
    },
    heroText: {
        fontSize: 15,
        color: '#dbeafe',
    },
    summaryCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#dfe7f5',
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.primaryDark,
    },
    summaryText: {
        fontSize: 15,
        color: COLORS.muted,
        marginTop: 8,
    },
    logoutButton: {
        marginTop: 12,
        borderRadius: 14,
    },
    bottomBar: {
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
});