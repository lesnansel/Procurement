<template>
  <aside class="flex flex-col h-full bg-[#14263d] text-white shadow-lg w-64">
    <!-- User Profile Section -->
    <div class="flex flex-col items-center py-6 border-b border-[#22334a]">
      <div class="relative flex flex-col items-center">
        <div class="rounded-full border border-[#3a4a5e] w-20 h-20 flex items-center justify-center mb-2">
          <span class="text-3xl font-semibold">JD</span>
          <span class="absolute bottom-2 right-2 bg-green-700 text-xs px-2 py-0.5 rounded-full font-bold" style="font-size:10px;">USER</span>
        </div>
        <div class="text-lg font-semibold">ansel</div>
        <div class="text-xs text-gray-300">user</div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto mt-2">
      <div class="px-4 py-2 text-xs text-gray-400 tracking-wider">GENERAL</div>
      <router-link to="/dashboard" class="sidebar-link" active-class="active">Home</router-link>
      <router-link to="/dashboard" class="sidebar-link" active-class="active">Dashboard</router-link>
      <router-link to="/profile-display" class="sidebar-link" active-class="active">Profile</router-link>

      <div class="px-4 py-2 text-xs text-gray-400 tracking-wider mt-4">PROCUREMENT</div>
      <router-link to="/purchase-request" class="sidebar-link" active-class="active">Request Purchase</router-link>
      <router-link to="/payment-tracking" class="sidebar-link" active-class="active">Track Payments</router-link>
      <router-link to="/approved-purchases" class="sidebar-link" active-class="active">PR Lists</router-link>

      <div class="px-4 py-2 text-xs text-gray-400 tracking-wider mt-4">USER MANAGEMENT</div>
      <router-link to="/edit-profile" class="sidebar-link" active-class="active">Edit Profile</router-link>
      <router-link to="/reset-password" class="sidebar-link" active-class="active">Reset Password</router-link>

      <div class="px-4 py-2 text-xs text-gray-400 tracking-wider mt-4">ADMIN CONTROLS</div>
      <!-- Add admin links here if needed -->
    </nav>

    <!-- Bottom Action Buttons -->
    <div class="p-4 border-t border-[#22334a] flex flex-col gap-2">
      <router-link to="/profile-display" class="sidebar-action-btn">
        <span class="inline-flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>View Profile</span>
      </router-link>
      <router-link to="/edit-profile" class="sidebar-action-btn">
        <span class="inline-flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>Settings</span>
      </router-link>
      <button class="sidebar-action-btn bg-[#2d1a2e] text-red-400 hover:bg-[#3a223a]" @click="$emit('logout')">
        <span class="inline-flex items-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>Log Out</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-link {
  display: block;
  padding: 0.75rem 1.5rem;
  color: #e5e7eb;
  border-radius: 0.375rem;
  margin-bottom: 0.25rem;
  font-size: 1rem;
  transition: background 0.2s, color 0.2s;
}
.sidebar-link.active,
.sidebar-link.router-link-exact-active {
  background: #1e3350;
  color: #fff;
}
.sidebar-link:hover {
  background: #22334a;
  color: #fff;
}
.sidebar-action-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.75rem 1.5rem;
  background: #1e3350;
  color: #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: background 0.2s, color 0.2s;
  border: none;
  cursor: pointer;
}
.sidebar-action-btn:hover {
  background: #22334a;
  color: #fff;
}
</style>
