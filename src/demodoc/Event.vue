<template>
  <div>
    <section>
      <h2>Event</h2>
      <p><strong>Paper.js</strong> defined some basic global events and item events, the <strong>paper-vueify</strong> forward them to vue's event chain.</p>
      <p>An item or a canvas supports: </p>
      <p><strong>click/doubleclick/mousedown/mouseup/mouseenter/mouseleave/mousemove/mouseup.</strong></p>
      <p>In this demo, we monitor the <strong>mousemove</strong> event of the boundary element.</p>
      <pre v-highlightjs>
        <code class="html">&lt;p-item :element=&quot;boundary&quot; @mousemove=&quot;Move&quot; @mouseleave=&quot;Leave&quot;&gt;&lt;/p-item&gt;</code>
      </pre>
    </section>
    <section>
      <h2>About Demo</h2>
      <p>Move the cursor into the boundary and the dots should following the cursor.</p>
    </section>
  </div>
</template>
