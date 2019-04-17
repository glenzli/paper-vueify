<template>
  <div>
    <section>
      <h2>Component</h2>
      <p>Using vue structure, we can make Animation component, like the MovieClip in Flash. In this demo, we create a Tadpole component with some controllable properties.</p>
      <pre v-highlightjs>
        <code class="vue">
&lt;template&gt;
  &lt;div&gt;
    &lt;p-item :elements=&quot;tadpole&quot;&gt;&lt;/p-item&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  @Component
  export default class extends Vue {
    // size of the tadpole
    @Prop({ default: 20 }) size!: number
    // color of the tadpole
    @Prop({ default: '#1a1c21' }) color!: string
    // position of the tadpole
    @Prop({ default: () => Point() }) position!: PointObject
    // moving velocity of the tadpole
    @Prop({ default: () => Point(1, 0) }) velocity!: PointObject
    // the boundary circle radius where tadpole can swim
    @Prop({ default: 0  }) radius!: number
    // in parade mode, every tadpole will circle the boundary center, or they will randomly swim
    @Prop({ default: false }) parade!: boolean

    get head() {
      return EllipseItem({ size: Point(this.size, this.size * 0.6), ... })
    }

    // ...

    get tadpole() {
      return GroupItem({ children: [this.head, this.tail] })
    }

    // ...
  }
&lt;/script&gt;
        </code>
      </pre>
      <p>In Tadpole component, we define the animation of it's tail, and parameteric swim route. Then we can get lots of tadpoles by generating differenct parameters and use those parameters as driver.</p>
      <pre v-highlightjs>
        <code class="html">&lt;tadpole v-for=&quot;(tadpole, index) in tadpoles&quot; :key=&quot;index&quot; ...&gt;&lt;/tadpole&gt;</code>
      </pre>
    </section>
    <section>
      <h2>About Demo</h2>
      <p>Use the central trigger to change the swim routes of those tadpoles.</p>
    </section>
  </div>
</template>
