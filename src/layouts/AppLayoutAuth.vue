<template>
  <div class="w-full h-auto min-h-screen p-8 bg-white">
    <div class="grid grid-cols-12 gap-16">
      <div class="col-span-5">
        <div class="h-full p-4 bg-slate-300 rounded-2xl">
          this is for background
        </div>
      </div>

      <div class="col-span-7">
        <RouterView />
      </div>
    </div>
  </div>
</template>
