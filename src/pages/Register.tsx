// Register.tsx
import { useFormik } from 'formik';
import * as z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; 
import { useState } from 'react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  profilePicture: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [profilePreview, setProfilePreview] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      profilePicture: '',
    },
    validationSchema: toFormikValidationSchema(registerSchema),
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      if (users.some((user: any) => user.email === values.email)) {
        alert('Email already registered');
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name: values.name,
        email: values.email,
        password: values.password, 
        profilePicture: values.profilePicture || '',
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      login(newUser);
      alert('Registration successful!');
      navigate('/home');
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePreview(result);
        formik.setFieldValue('profilePicture', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Register</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-700 mb-2">Profile Picture (Optional)</label>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {profilePreview ? (
                  <img
                    src={profilePreview}
                    alt="Profile preview"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="profilePicture"
                  className="cursor-pointer bg-green-100 text-green-700 py-2 px-4 rounded-md text-sm hover:bg-green-200 transition-colors"
                >
                  Choose Image
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setProfilePreview('');
                    formik.setFieldValue('profilePicture', '');
                  }}
                  className="ml-2 text-red-500 text-sm hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-green-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
            />
            {formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
          </div>
          
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
          
          <div>
            <label className="block text-green-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
            />
            {formik.errors.confirmPassword && <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-green-700 text-center">
          Already have an account? <Link to="/login" className="text-green-600 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}

const User = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);