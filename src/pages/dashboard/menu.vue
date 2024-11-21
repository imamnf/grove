<template>
  <div class="grid grid-cols-12 gap-x-8">
    <ViewsMenuAdd />

    <Card class="col-span-6">
      <template #title>Simple Card</template>
      <template #content>
        <p class="m-0">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora veniam nobis, voluptates similique
          cupiditate deleniti? Qui neque voluptates, inventore laudantium doloribus eligendi delectus, eveniet sint
          repellendus iure possimus, eos suscipit vel? Ipsam sunt, quod eligendi expedita at, mollitia fuga
          reprehenderit quo quia eaque, minima beatae eos accusamus voluptatibus libero ad!
        </p>
      </template>
    </Card>
  </div>
</template>

<route lang="json">{
  "meta": {
    "layout": "AppLayoutDashboard",
    "title": "Menu"
  }
}</route>
