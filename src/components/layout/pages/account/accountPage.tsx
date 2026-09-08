"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { 
  User, 
  MapPin, 
  Settings, 
  ChevronRight, 
  Check, 
  EyeOff, 
  Eye, 
  Lock,
  Key,
  Loader2,
  Trash2,
  Package,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { updateProfileAPI } from '@/lib/services/authService';

export default function AccountPage() {
  const { data: session } = useSession();
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  // Profile form state
  const [profileLoading, setProfileLoading] = useState(false);
  // Address state
  const [addresses, setAddresses] = useState<Array<{
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
  }>>([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addAddressLoading, setAddAddressLoading] = useState(false);
  const [deleteAddressId, setDeleteAddressId] = useState<string | null>(null);
  const [addressName, setAddressName] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [addressPhone, setAddressPhone] = useState('');
  const [addressCity, setAddressCity] = useState('');

  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";
  const userRole = session?.user?.role || "user";
  const userId = session?.user?.id || "—";

  const authToken = session?.user?.token;

  const loadAddresses = React.useCallback(async () => {
    if (!authToken) return;

    setAddressLoading(true);
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
        method: "GET",
        headers: {
          token: authToken,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to load addresses");
        return;
      }

      setAddresses(Array.isArray(data?.data) ? data.data : []);
    } catch {
      toast.error("Network error while loading addresses");
    } finally {
      setAddressLoading(false);
    }
  }, [authToken]);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAddresses();
  }, [loadAddresses]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Current password is required");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (!session?.user?.token) {
      toast.error("You must be logged in to change your password");
      return;
    }

    setPwLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: session.user.token,
          },
          body: JSON.stringify({
            currentPassword,
            password: newPassword,
            rePassword: confirmPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to change password");
        return;
      }

      toast.success("Password changed successfully!");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setPwLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user?.token) return toast.error("You must be logged in to update your profile");
    const fields = new FormData(e.currentTarget);
    const name = String(fields.get("name") || "").trim();
    const email = String(fields.get("email") || "").trim();
    const phone = String(fields.get("phone") || "").trim();
    if (!name || !email || !phone) return toast.error("Please complete your name, email, and phone number");
    setProfileLoading(true);
    try {
      await updateProfileAPI(session.user.token, { name, email, phone });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.token) {
      toast.error("You must be logged in to add address");
      return;
    }
    if (!addressName.trim() || !addressDetails.trim() || !addressPhone.trim() || !addressCity.trim()) {
      toast.error("Please fill all address fields");
      return;
    }

    setAddAddressLoading(true);
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: session.user.token,
        },
        body: JSON.stringify({
          name: addressName,
          details: addressDetails,
          phone: addressPhone,
          city: addressCity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to add address");
        return;
      }

      toast.success("Address added successfully");
      setAddressName('');
      setAddressDetails('');
      setAddressPhone('');
      setAddressCity('');
      loadAddresses();
    } catch {
      toast.error("Network error while adding address");
    } finally {
      setAddAddressLoading(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!session?.user?.token) {
      toast.error("You must be logged in to delete address");
      return;
    }

    setDeleteAddressId(id);
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
        method: "DELETE",
        headers: {
          token: session.user.token,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete address");
        return;
      }

      toast.success("Address removed");
      setAddresses((prev) => prev.filter((address) => address._id !== id));
    } catch {
      toast.error("Network error while deleting address");
    } finally {
      setDeleteAddressId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[rgba(249,250,251,0.5)] flex flex-col font-['Exo'] pt-[40px] md:pt-[113px] relative pb-[120px]">
      
      {/* Top Gradient Banner Header */}
      <div className="w-full bg-gradient-to-br from-[#16A34A] via-[#22C55E] to-[#4ADE80] flex justify-center">
        <div className="container max-w-[1536px] w-full px-4 lg:px-44 py-[48px] flex flex-col gap-6 h-auto min-h-[204px]">
          
          <nav className="flex items-center gap-2 text-[14px] leading-[20px] font-medium">
            <Link href="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">My Account</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] rounded-2xl shrink-0">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-[30px] font-bold leading-[36px] tracking-[-0.75px] text-white">
                My Account
              </h1>
              <p className="text-[16px] font-medium leading-[24px] text-white/80">
                Manage your addresses and account settings
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Main Body Configuration */}
      <div className="w-full flex justify-center pt-[32px]">
        <div className="container max-w-[1536px] w-full px-4 lg:px-44 flex flex-col lg:flex-row gap-[32px] items-start">
          
          {/* Left Sidebar Menu */}
          <aside className="w-full lg:w-[288px] max-w-full shrink-0">
            <nav className="bg-white border border-[#F3F4F6] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] rounded-2xl flex flex-col">
              <div className="p-4 border-[0px] pb-2">
                <h2 className="font-bold text-[16px] leading-[24px] text-[#101828]">My Account</h2>
              </div>
              <ul className="p-2 flex flex-col gap-1">
                <li>
                  <Link href="#settings" className="flex items-center justify-between p-3 gap-3 rounded-xl bg-[#F0FDF4] transition-colors h-[60px]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#22C55E] rounded-lg flex items-center justify-center">
                        <Settings className="w-[18px] h-[18px] text-white" />
                      </div>
                      <span className="font-medium text-[16px] leading-[24px] text-[#15803D]">Settings</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#22C55E]" />
                  </Link>
                </li>
                <li>
                  <Link href="#addresses" className="flex items-center justify-between p-3 gap-3 rounded-xl hover:bg-gray-50 transition-colors group h-[60px]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#F3F4F6] rounded-lg flex items-center justify-center transition-colors">
                        <MapPin className="w-4 h-4 text-[#6A7282]" />
                      </div>
                      <span className="font-medium text-[16px] leading-[24px] text-[#4A5565]">My Addresses</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#99A1AF]" />
                  </Link>
                </li>
                <li>
                  <Link href="/orders/allorders" className="flex items-center justify-between p-3 gap-3 rounded-xl hover:bg-gray-50 transition-colors group h-[60px]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#F3F4F6] rounded-lg flex items-center justify-center transition-colors">
                        <Package className="w-4 h-4 text-[#6A7282]" />
                      </div>
                      <span className="font-medium text-[16px] leading-[24px] text-[#4A5565]">My Orders</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#99A1AF]" />
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Right Main Forms Box */}
          <main className="flex-1 flex flex-col gap-[24px] max-w-[1184px] w-full">
            
            {/* Header Text */}
            <div className="flex flex-col gap-1 w-full" id="settings">
              <h2 className="text-[20px] font-bold text-[#101828] leading-[28px]">Account Settings</h2>
              <p className="text-[14px] font-medium text-[#6A7282] leading-[20px]">Update your profile information and change your password</p>
            </div>

            {/* Card 1: Profile Information */}
            <div className="bg-white border border-[#F3F4F6] rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] flex flex-col w-full overflow-hidden">
              <div className="p-[32px] flex flex-col gap-[24px] w-full">
                
                {/* Block Header */}
                <div className="flex items-center gap-4 w-full">
                  <div className="w-14 h-14 bg-[#DCFCE7] rounded-2xl flex items-center justify-center shrink-0">
                    <User className="w-7 h-7 text-[#16A34A]" />
                  </div>
                  <div className="flex flex-col w-full">
                    <h3 className="font-bold text-[16px] leading-[24px] text-[#101828]">Profile Information</h3>
                    <p className="text-[14px] font-medium leading-[20px] text-[#6A7282]">Update your personal details</p>
                  </div>
                </div>

                {/* Form Elements */}
                <form className="flex flex-col gap-[20px] w-full" onSubmit={handleUpdateProfile}>
                  {/* Full Name */}
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-[14px] leading-[20px] text-[#364153] font-medium">Full Name</label>
                    <Input 
                      name="name"
                      defaultValue={userName} 
                      className="h-[50px] w-full border-[#E5E7EB] rounded-xl px-4 text-[16px] leading-[24px] font-medium text-[#364153] focus-visible:ring-[#16A34A] shadow-none" 
                    />
                  </div>
                  
                  {/* Email Address */}
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-[14px] leading-[20px] text-[#364153] font-medium">Email Address</label>
                    <Input 
                      type="email"
                      name="email"
                      defaultValue={userEmail}
                      placeholder="Enter your email" 
                      className="h-[50px] w-full border-[#E5E7EB] rounded-xl px-4 text-[16px] leading-[21px] font-medium placeholder:text-[#364153]/50 focus-visible:ring-[#16A34A] shadow-none" 
                    />
                  </div>
                  
                  {/* Phone Number */}
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-[14px] leading-[20px] text-[#364153] font-medium">Phone Number</label>
                    <Input 
                      type="tel"
                      name="phone"
                      placeholder="01xxxxxxxxx" 
                      className="h-[50px] w-full border-[#E5E7EB] rounded-xl px-4 text-[16px] leading-[21px] font-medium placeholder:text-[#364153]/50 focus-visible:ring-[#16A34A] shadow-none" 
                    />
                  </div>

                  {/* Save Button */}
                  <div className="pt-4 h-[64px] flex items-start w-full">
                    <button 
                      type="submit"
                      disabled={profileLoading}
                      className="inline-flex items-center justify-center gap-2 bg-[#16A34A] text-white px-6 py-3 rounded-xl w-auto min-w-[179px] h-[48px] shadow-[0_10px_15px_-3px_rgba(22,163,74,0.25),0_4px_6px_-4px_rgba(22,163,74,0.25)] hover:bg-[#15803D] transition-colors"
                    >
                      {profileLoading ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : <Check className="w-5 h-5 text-white" />}
                      <span className="font-semibold text-[16px] leading-[24px] text-center">Save Changes</span>
                    </button>
                  </div>
                </form>

              </div>

              {/* Informational Sub-Panel (Gray section) */}
              <div className="bg-[#F9FAFB] p-[32px] flex flex-col gap-[16px] w-full h-[164px]">
                 <h3 className="font-bold text-[16px] leading-[24px] text-[#101828] w-full">Account Information</h3>
                 <div className="flex flex-col gap-[12px] w-full">
                   <div className="flex items-center justify-between w-full h-[20px]">
                      <span className="text-[#6A7282] text-[14px] font-medium leading-[20px]">User ID</span>
                      <span className="text-[#364153] text-[12px] font-medium leading-[20px] font-mono truncate max-w-[200px]">{userId}</span>
                   </div>
                   <div className="flex items-center justify-between w-full h-[28px]">
                      <span className="text-[#6A7282] text-[14px] font-medium leading-[20px]">Role</span>
                      <span className="bg-[#DCFCE7] text-[#15803D] text-[14px] leading-[20px] font-medium px-3 py-1 rounded-lg capitalize min-w-[54px] h-[28px] text-center flex items-center justify-center">
                        {userRole}
                      </span>
                   </div>
                 </div>
              </div>
            </div>

            {/* Card 2: Change Password */}
            <div className="bg-white border border-[#F3F4F6] rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] flex flex-col w-full h-auto">
              <div className="p-[32px] flex flex-col gap-[24px] w-full">
                
                {/* Block Header */}
                <div className="flex items-center gap-4 w-full h-[56px]">
                  <div className="w-14 h-14 bg-[#FEF3C6] rounded-2xl flex items-center justify-center shrink-0">
                    <Lock className="w-7 h-7 text-[#E17100]" />
                  </div>
                  <div className="flex flex-col w-full">
                    <h3 className="font-bold text-[16px] leading-[24px] text-[#101828]">Change Password</h3>
                    <p className="text-[14px] font-medium leading-[20px] text-[#6A7282]">Update your account password</p>
                  </div>
                </div>

                {/* Password Change Form */}
                <form className="flex flex-col gap-[20px] w-full" onSubmit={handleChangePassword}>
                  {/* Current Password */}
                  <div className="flex flex-col gap-2 relative w-full">
                    <label className="text-[14px] text-[#364153] font-medium leading-[20px]">Current Password</label>
                    <div className="relative w-full h-[50px]">
                      <Input 
                        type={showCurrentPass ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your current password" 
                        className="w-full h-full border-[#E5E7EB] rounded-xl pl-4 pr-12 text-[16px] font-medium leading-[21px] placeholder:text-[#364153]/50 focus-visible:ring-[#16A34A] shadow-none" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-[16px] top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-[#99A1AF] hover:text-[#364153] transition-colors bg-transparent border-0"
                      >
                        {showCurrentPass ? <Eye className="w-[20px] h-[16px]" /> : <EyeOff className="w-[20px] h-[16px]" />}
                      </button>
                    </div>
                  </div>
                  
                  {/* New Password */}
                  <div className="flex flex-col gap-2 relative w-full">
                    <label className="text-[14px] text-[#364153] font-medium leading-[20px]">New Password</label>
                    <div className="relative w-full h-[50px]">
                      <Input 
                        type={showNewPass ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password" 
                        className="w-full h-full border-[#E5E7EB] rounded-xl pl-4 pr-12 text-[16px] font-medium leading-[21px] placeholder:text-[#364153]/50 focus-visible:ring-[#16A34A] shadow-none" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-[16px] top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-[#99A1AF] hover:text-[#364153] transition-colors bg-transparent border-0"
                      >
                        {showNewPass ? <Eye className="w-[20px] h-[16px]" /> : <EyeOff className="w-[20px] h-[16px]" />}
                      </button>
                    </div>
                    <p className="text-[#6A7282] text-[12px] font-medium leading-[16px] mt-0.5">Must be at least 6 characters</p>
                  </div>

                  {/* Confirm New Password */}
                  <div className="flex flex-col gap-2 relative w-full">
                    <label className="text-[14px] text-[#364153] font-medium leading-[20px]">Confirm New Password</label>
                    <div className="relative w-full h-[50px]">
                      <Input 
                        type={showConfirmPass ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password" 
                        className="w-full h-full border-[#E5E7EB] rounded-xl pl-4 pr-12 text-[16px] font-medium leading-[21px] placeholder:text-[#364153]/50 focus-visible:ring-[#16A34A] shadow-none" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-[16px] top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-[#99A1AF] hover:text-[#364153] transition-colors bg-transparent border-0"
                      >
                        {showConfirmPass ? <Eye className="w-[20px] h-[16px]" /> : <EyeOff className="w-[20px] h-[16px]" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit New Password */}
                  <div className="pt-4 h-[64px] flex items-start w-full">
                    <button 
                      type="submit"
                      disabled={pwLoading}
                      className="inline-flex items-center justify-center gap-2 bg-[#E17100] text-white px-6 py-3 rounded-xl w-auto min-w-[208px] h-[48px] shadow-[0_10px_15px_-3px_rgba(225,113,0,0.25),0_4px_6px_-4px_rgba(225,113,0,0.25)] hover:bg-[#c46100] transition-colors disabled:opacity-60"
                    >
                      {pwLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                      ) : (
                        <Key className="w-5 h-5 text-white" />
                      )}
                      <span className="font-semibold text-[16px] leading-[24px] text-center">
                        {pwLoading ? 'Changing...' : 'Change Password'}
                      </span>
                    </button>
                  </div>
                </form>

              </div>
            </div>

            {/* Card 3: My Addresses */}
            <div id="addresses" className="bg-white border border-[#F3F4F6] rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] flex flex-col w-full h-auto">
              <div className="p-[32px] flex flex-col gap-[24px] w-full">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-14 h-14 bg-[#DCFCE7] rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-7 h-7 text-[#16A34A]" />
                  </div>
                  <div className="flex flex-col w-full">
                    <h3 className="font-bold text-[16px] leading-[24px] text-[#101828]">My Addresses</h3>
                    <p className="text-[14px] font-medium leading-[20px] text-[#6A7282]">
                      Add and remove your saved addresses
                    </p>
                  </div>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAddAddress}>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] leading-[20px] text-[#364153] font-medium">Address Name</label>
                    <Input
                      value={addressName}
                      onChange={(e) => setAddressName(e.target.value)}
                      placeholder="Home"
                      className="h-[50px] border-[#E5E7EB] rounded-xl px-4 text-[16px] leading-[24px] font-medium text-[#364153] focus-visible:ring-[#16A34A] shadow-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] leading-[20px] text-[#364153] font-medium">City</label>
                    <Input
                      value={addressCity}
                      onChange={(e) => setAddressCity(e.target.value)}
                      placeholder="Gizaa"
                      className="h-[50px] border-[#E5E7EB] rounded-xl px-4 text-[16px] leading-[24px] font-medium text-[#364153] focus-visible:ring-[#16A34A] shadow-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[14px] leading-[20px] text-[#364153] font-medium">Details</label>
                    <Input
                      value={addressDetails}
                      onChange={(e) => setAddressDetails(e.target.value)}
                      placeholder="Home details"
                      className="h-[50px] border-[#E5E7EB] rounded-xl px-4 text-[16px] leading-[24px] font-medium text-[#364153] focus-visible:ring-[#16A34A] shadow-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] leading-[20px] text-[#364153] font-medium">Phone</label>
                    <Input
                      value={addressPhone}
                      onChange={(e) => setAddressPhone(e.target.value)}
                      placeholder="01010700700"
                      className="h-[50px] border-[#E5E7EB] rounded-xl px-4 text-[16px] leading-[24px] font-medium text-[#364153] focus-visible:ring-[#16A34A] shadow-none"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={addAddressLoading}
                      className="inline-flex items-center justify-center gap-2 bg-[#16A34A] text-white px-6 py-3 rounded-xl min-w-[170px] h-[48px] hover:bg-[#15803D] transition-colors disabled:opacity-60"
                    >
                      {addAddressLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                      ) : (
                        <Check className="w-5 h-5 text-white" />
                      )}
                      <span className="font-semibold text-[16px] leading-[24px]">
                        {addAddressLoading ? 'Adding...' : 'Add Address'}
                      </span>
                    </button>
                  </div>
                </form>

                <div className="flex flex-col gap-3">
                  {addressLoading ? (
                    <div className="py-8 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-[#16A34A]" />
                    </div>
                  ) : addresses.length === 0 ? (
                    <p className="text-[14px] text-[#6A7282] font-medium">No saved addresses yet.</p>
                  ) : (
                    addresses.map((address) => (
                      <div
                        key={address._id}
                        className="flex items-start justify-between gap-4 p-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]"
                      >
                        <div className="flex flex-col gap-1">
                          <h4 className="text-[16px] font-semibold text-[#101828]">{address.name}</h4>
                          <p className="text-[14px] text-[#4A5565]">{address.details}</p>
                          <p className="text-[13px] text-[#6A7282]">
                            {address.city} • {address.phone}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteAddress(address._id)}
                          disabled={deleteAddressId === address._id}
                          className="inline-flex items-center gap-2 text-[#DC2626] hover:text-[#B91C1C] disabled:opacity-60"
                        >
                          {deleteAddressId === address._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                          <span className="text-[14px] font-medium">Remove</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
