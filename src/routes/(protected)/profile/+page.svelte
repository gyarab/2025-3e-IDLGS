<script>
  // Default gradient state
  let bgGradient = "from-orange-400 to-rose-500";
  
  // Profile data
  let user = {
    name: "Alex Rivera",
    role: "Medical Student",
    bio: "Currently studying Anatomy and Physiology. Lover of digital flashcards and dark roast coffee.",
    booksRead: 12,
    studyHours: 145
  };

  const gradients = [
    { name: 'Orange (Default)', class: 'from-orange-400 to-rose-500' },
    { name: 'Ocean', class: 'from-blue-500 to-cyan-400' },
    { name: 'Midnight', class: 'from-indigo-600 to-purple-700' },
    { name: 'Nature', class: 'from-emerald-500 to-teal-600' }
  ];
</script>

<div class="min-h-screen bg-gray-50 flex flex-col items-center">
  <div class="w-full h-40 bg-gradient-to-r {bgGradient} transition-all duration-500 shadow-inner relative">
    <div class="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-lg border border-white/30">
      <p class="text-xs font-semibold text-white mb-2 uppercase tracking-wider">Customize Theme</p>
      <div class="flex gap-2">
        {#each gradients as g}
          <button 
            on:click={() => bgGradient = g.class}
            class="w-6 h-6 rounded-full border-2 border-white hover:scale-110 transition-transform {g.class} bg-gradient-to-r"
            title={g.name}
          ></button>
        {/each}
      </div>
    </div>
  </div>

  <div class="max-w-4xl w-full -mt-24 px-4 pb-12">
    <div class="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8 items-start">
      
      <div class="relative mx-auto md:mx-0">
        <div class="w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gray-200">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User Avatar" />
        </div>
      </div>

      <div class="flex-1">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-3xl font-bold text-gray-800">{user.name}</h1>
          <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm font-medium transition-colors">
            Edit Profile
          </button>
        </div>
        
        <p class="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-4">
          {user.role}
        </p>
        
        <p class="text-gray-600 leading-relaxed mb-6">
          {user.bio}
        </p>

        <div class="grid grid-cols-2 gap-4 border-t pt-6">
          <div class="bg-gray-50 p-4 rounded-xl">
            <p class="text-sm text-gray-500">Books in Library</p>
            <p class="text-2xl font-bold text-gray-800">{user.booksRead}</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl">
            <p class="text-sm text-gray-500">Study Hours</p>
            <p class="text-2xl font-bold text-gray-800">{user.studyHours}h</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Recent Textbooks</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {#each Array(3) as _, i}
          <div class="h-32 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
             <div class="w-16 h-20 bg-gray-200 rounded flex-shrink-0 shadow-sm"></div>
             <div>
               <div class="h-4 w-24 bg-gray-200 rounded mb-2"></div>
               <div class="h-3 w-16 bg-gray-100 rounded"></div>
             </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>