<template>
  <div>
    <section>
      <p>Before you use any component, you must setup the paper to a canvas element, you can use <strong>p-canvas</strong> to achieve this. The <strong>autosize</strong> parameter will make the canvas automatically adapt to it's parent's size, a resize event will be fired after the canvas size changed, and a <strong>size: { width: number, height: number }</strong> parameter of canvas will be passed.</p>
      <pre v-highlightjs>
        <code class="html">&lt;p-canvas :autosize=&quot;true&quot; @resize=&quot;AfterResized&quot;&gt;&lt;/p-canvas&gt;</code>
      </pre>
    </section>
    <section>
      <h2>Shapes</h2>
      <p>There are many predefined shapes in <strong>paper-vueify</strong>, most of them share similar interface as paper.js Object.</p>
      <p>Each item have opacity, visible, and coordinate property which defined as:</p>
      <pre v-highlightjs>
        <code class="typescript">
interface Coordinate {
  position: { x: number, y: number },
  scale: { x: number, y: number },
  rotation: number,
  skewX: number
}
        </code>
      </pre>
      <p>And for shapes, they also have brush, stroke and shadow property for their style settings, each property has very self-explanatory interface.</p>
      <p>There are <strong>Rectangle</strong>, <strong>Circle</strong>, <strong>Ellipse</strong>, <strong>RegularPolygon</strong>, <strong>Star</strong> and <strong>PointText</strong> objects which share the same key parameter interface with <strong>paper.js</strong>.</p>
      <p>And a <strong>Path</strong> which accepts closed and segments or children as parameters. Also, threre is a <strong>Polygon</strong> and a <strong>Polygon</strong> accepts points as parameters.</p>
      <pre v-highlightjs>
        <code class="javascript">
//Draw a rectangle, 200px in width and 100px in height, and corner radius equals 15px.
let rect = RectangleItem({ size: Point(200, 100), radius: (15, 15) })

// draw a polyline with given points
let polyline = PolylineItem({ points: [Point(0, 0), Point(0, 200), Point(200, 200)] })

// draw a red circle
let brush = SolidBrush(Color$.ToColor('red'))
let circle = CircleItem({ radius: 50, brush })
        </code>
      </pre>
      <p>Use <strong>p-item</strong> to mount any elements into the DOM. For your reference, the <strong>p-item</strong> tag just create an empty div tag, you can put it anywhere you want.</p>
      <pre v-highlightjs>
        <code class="html">&lt;p-item :element=&quot;someShapeElement&quot;&gt;&lt;/p-item&gt;</code>
      </pre>
    </section>
    <section>
      <h2>Symbol</h2>
      <p>In <strong>paper.js</strong>, we have Symbol and PlacedSymbol, while Symbol is a definition and PlacedSymbol is an instance. In <strong>paper-vueify</strong>, there are some slight differences.</p>
      <p>Here in <strong>paper-vueify</strong>, a SymbolDefinition is replaced the origin Symbol in <strong>paper.js</strong>, and a SymbolDefinition needs a <em>unique key</em>. With this <em>key</em>, you can create infinite number of Symbols to refer it.</p>
    </section>

    <section>
      <p>Let's make this clear by examples, here goes the definition.</p>
      <pre v-highlightjs>
        <code class="javascript">definiton = SymbolDefinition('rectangle', RectangleItem({ ...params }) }))</code>
      </pre>
      <p>Then you have to register the symbol definition.</p>
      <pre v-highlightjs>
        <code class="html">&lt;p-symbol-definition :element=&quot;definition&quot;&gt;&lt;/p-symbol-definition&gt;</code>
      </pre>
      <p>After that, you can create as many symbols as you want.</p>
      <pre v-highlightjs>
        <code class="javascript">symbols = new Array(50).fill(null).map(() => {
              return SymbolItem({ key: 'rectangle', ...someCoordinates }))
            }</code>
      </pre>
      <p>And load them by p-item.</p>
      <pre v-highlightjs>
        <code class="html">&lt;p-item v-for=&quot;s in symbols&quot; :key=&quot;s&quot; :element=&quot;s&quot;&gt;&lt;/p-item&gt;</code>
      </pre>
    </section>
    <section>
      <h2>Group</h2>
      <p>Group is a container item to group children elements, the coordinate, opacity and visible property will be composed with each children's property. A group can be initialized as following: </p>
      <pre v-highlightjs>
        <code class="javascript">
let rect1 = Rectangle({ coordinate: Coordinate({ position: [-200, 0] }) })
let rect2 = Rectangle({ coordinate: Coordinate({ position: [200, 0] }) })
let group = GroupItem({ children: [rect1, rect2] })
        </code>
      </pre>
    </section>
    <section>
      <h2>About Demo</h2>
      <p>Using symbol to generate numbers of shapes, click the shape and the generation will be changed.</p>
    </section>
  </div>
</template>
