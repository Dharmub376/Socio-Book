// Login.tsx
import { useFormik } from 'formik';
import * as z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Adjust path as needed

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      const user = users.find(
        (u: any) => u.email === values.email && u.password === values.password
      );
      
      if (user) {
        login(user);
        navigate('/home');
      } else {
        alert('Invalid email or password');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
            />
            {formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
          </div>
          <div>
            <label className="block text-green-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
            />
            {formik.errors.password && <p className="text-red-500 text-sm">{formik.errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-green-700 text-center">
          Don't have an account? <Link to="/register" className="text-green-600 font-semibold">Register</Link>
        </p>
      </div>
    </div>
  );
}