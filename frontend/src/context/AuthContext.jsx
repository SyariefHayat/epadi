import { 
    createContext, 
    useContext, 
    useEffect, 
    useState 
} from 'react';

import {
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence,
} from 'firebase/auth';

import { auth } from '@/services/firebase';
import { apiInstanceExpress } from '@/services/apiInstance';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    // Fungsi untuk fetch user data dari API
    const fetchUserData = async (user) => {
        try {
            const userSignIn = await apiInstanceExpress.post("sign-in", {
                uid: user.uid,
                email: user.email,
            });

            if (userSignIn.status === 200) {
                setUserData(userSignIn.data.data);
                return userSignIn.data.data;
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            // Jika gagal fetch dari API, gunakan data dari Firebase
            const fallbackUserData = {
                uid: user.uid,
                email: user.email,
                username: user.displayName,
            };
            setUserData(fallbackUserData);
            return fallbackUserData;
        }
    };

    useEffect(() => {
        const listen = async () => {
            try {
                await setPersistence(auth, browserSessionPersistence);
                
                const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    setLoading(true);
                    
                    if (user) {
                        setCurrentUser(user);
                        
                        // Set data user sementara dari Firebase terlebih dahulu
                        const tempUserData = {
                            uid: user.uid,
                            email: user.email,
                            username: user.displayName,
                            profilePicture: user.photoURL,
                            provider: 'google.com'
                        };
                        setUserData(tempUserData);
                        
                        // Kemudian fetch data lengkap dari API
                        await fetchUserData(user);
                    } else {
                        setCurrentUser(null);
                        setUserData(null);
                    }

                    setLoading(false);
                });
                
                return unsubscribe;
            } catch (error) {
                console.error("Auth error:", error);
                setLoading(false);
            }
        };

        const unsubscribePromise = listen();

        return () => {
            unsubscribePromise.then(unsubscribe => {
                if (typeof unsubscribe === 'function') unsubscribe();
            });
        };
    }, []);

    // Fungsi untuk refresh user data
    const refreshUserData = async () => {
        if (currentUser) {
            setLoading(true);
            await fetchUserData(currentUser);
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            currentUser, 
            userData, 
            loading, 
            refreshUserData 
        }}>
            {children}
        </AuthContext.Provider>
    );
};