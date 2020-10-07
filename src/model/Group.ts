import paper from 'paper';
import { PaperItemObject, PaperItemRenderer, RegisterItemType, PaperItem } from './Item';

export interface GroupItemObject extends PaperItemObject {
  children: PaperItemObject[];
}

export function GroupItem({ children = [], ...base }: Partial<GroupItemObject> = {}) {
  return { children, ...PaperItem(GROUP_TYPE, base) };
}

export class GroupItemRenderer extends PaperItemRenderer {
  protected InitVisual() {
    this._visual = new paper.Group({ applyMatrix: false });
  }

  protected RenderVisual(element: GroupItemObject) {
    return null;
  }
}

const GROUP_TYPE = RegisterItemType(GroupItemRenderer, 'Group');

