import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/users/useAuth";

function ProtectedRoute({ children, requireAdmin = false, requireMaster = false }) {
  const { isAuthenticated, isAdmin, isMaster, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireMaster && !isMaster) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
