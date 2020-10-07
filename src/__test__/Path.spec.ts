import 'jest';
import paper from 'paper';
import { Point } from 'paper-vueify-datatypes';
import { PathItem, PathItemRenderer, Segment } from '../model/Path';
import { GetItemTypename, GetItemType } from '../model/Item';

(paper as any).setup(document.createElement('canvas'));

describe('Path', () => {
  test('Segment', () => {
    expect(Segment()).toEqual({
      point: Point(0, 0),
      handleIn: Point(0, 0),
      handleOut: Point(0, 0),
    });
  });

  test('PathItem', () => {
    expect(PathItem()).toEqual({
      segments: [],
      closed: true,
      brush: { type: 1, color: { alpha: 1, blue: 0, green: 0, red: 0 } },
      stroke: {
        brush: { type: 1, color: { alpha: 1, blue: 0, green: 0, red: 0 } },
        thickness: 1,
        dash: [0, 0],
        dashOffset: 0,
        join: 'miter',
        cap: 'butt',
        miterLimit: 10,
      },
      shadow: {
        color: { red: 0, green: 0, blue: 0, alpha: 1 },
        blur: 0,
        offset: { x: 0, y: 0 },
        enabled: false,
      },
      type: 0,
      coordinate: {
        position: { x: 0, y: 0 },
        scale: { x: 1, y: 1 },
        rotation: 0,
        skewX: 0,
      },
      opacity: 1,
      visible: true,
      selectable: true,
    });
  });

  test('Renderer Simple Path', () => {
    const renderer = new PathItemRenderer();
    const item = PathItem({ segments: [Segment(Point(0, 0)), Segment(Point(1, 0)), Segment(Point(1, 1)), Segment(Point(0, 1))], closed: false });
    const visual = renderer.RenderVisual(item);
    expect(visual.area).toEqual(1);
  });

  test('Renderer Compound Path', () => {
    const renderer = new PathItemRenderer();
    const item = PathItem({
      children: [
        { segments: [Segment(Point(0, 0)), Segment(Point(3, 0)), Segment(Point(3, 3)), Segment(Point(0, 3))] },
        { segments: [Segment(Point(1, 1)), Segment(Point(1, 2)), Segment(Point(2, 2)), Segment(Point(2, 1))] },
      ],
      closed: true,
    });
    const visual = renderer.RenderVisual(item);
    expect(visual.children.length).toEqual(2);
    expect(visual.area).toEqual(8);
  });

  test('Renderer Compound Path Different close state', () => {
    const renderer = new PathItemRenderer();
    const item = PathItem({
      children: [
        { segments: [Segment(Point(0, 0)), Segment(Point(3, 0)), Segment(Point(3, 3)), Segment(Point(0, 3))] },
        { segments: [Segment(Point(0, 0)), Segment(Point(-3, 0))], closed: false },
      ],
      closed: true,
    });
    const visual = renderer.RenderVisual(item);
    expect(visual.children.length).toEqual(2);
    expect(visual.area).toEqual(9);
    expect((visual.children[0] as paper.Path).closed).toEqual(true);
    expect((visual.children[1] as paper.Path).closed).toEqual(false);
  });

  test('Registered', () => {
    const item = PathItem();
    expect(GetItemTypename(item.type)).toEqual('Path');
    expect(GetItemType(item.type)).toEqual(PathItemRenderer);
  });
});
