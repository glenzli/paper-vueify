import paper from 'paper';
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { PaperItemObject, $iMap, PaperItemRenderer, GetItemType } from '../model';

@Component
export class BasicMixin extends Vue {
  @Prop({ required: true }) public element!: PaperItemObject;
  @Prop({ default: -1 }) public index!: number;

  public rendererId: number = -1;

  get context() {
    return {};
  }

  @Watch('context', { deep: true })
  public OnContextChanged() {
    $iMap.Get<PaperItemRenderer>(this.rendererId)!.Render(this.element);
    this.$emit('draw', this.rendererId, this.index);
  }

  @Watch('element.coordinate', { deep: true })
  public OnCoordinateChanged() {
    $iMap.Get<PaperItemRenderer>(this.rendererId)!.UpdateCoordinate(this.element.coordinate);
  }

  @Watch('element.opacity')
  public OnOpacityChanged() {
    $iMap.Get<PaperItemRenderer>(this.rendererId)!.UpdateOpacity(this.element.opacity);
  }

  @Watch('element.visible')
  public OnVisibleChanged() {
    $iMap.Get<PaperItemRenderer>(this.rendererId)!.UpdateVisible(this.element.visible);
  }

  @Watch('element.seletable')
  public OnSelectableChanged() {
    $iMap.Get<PaperItemRenderer>(this.rendererId)!.selectable = this.element.selectable;
  }

  public On(type: string, event?: paper.Event) {
    this.$emit(type, event);
  }

  public CreateRenderer(): PaperItemRenderer {
    const constructor = GetItemType(this.element.type)!;
    const renderer = new constructor() as PaperItemRenderer;
    this.rendererId = renderer.id;
    return renderer;
  }

  public mounted() {
    let renderer = $iMap.Get<PaperItemRenderer>(this.rendererId);
    if (!renderer) {
      renderer = this.CreateRenderer();
    }
    renderer.On((type, event) => this.On(type, event));
    renderer.Render(this.element);
    this.$emit('draw', this.rendererId, this.index);
  }

  public beforeDestroy() {
    const renderer = $iMap.Get<PaperItemRenderer>(this.rendererId);
    if (renderer) {
      renderer.Destroy();
    }
  }
}
