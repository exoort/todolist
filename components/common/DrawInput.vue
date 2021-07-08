<template>
  <div class="border text-center pa-5">
    <canvas :id="elementId" />
    <div v-if="cfd">
      <v-btn
        color="primary"
        outlined
        @click="save"
      >
        Save
        <v-icon right>
          mdi-content-save-outline
        </v-icon>
      </v-btn>
      <v-btn
        color="red"
        outlined
        @click="remove"
      >
        remove
        <v-icon right>
          mdi-close
        </v-icon>
      </v-btn>
      <v-btn
        color="primary"
        outlined
        @click="cfd.clear()"
      >
        Clear
        <v-icon right>
          mdi-delete-outline
        </v-icon>
      </v-btn>
      <v-btn
        color="primary"
        outlined
        @click="cfd.undo()"
      >
        <v-icon left>
          mdi-arrow-left
        </v-icon>
        Undo
      </v-btn>
      <v-btn
        color="primary"
        outlined
        @click="cfd.redo()"
      >
        Redo
        <v-icon right>
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import CanvasFreeDrawing, { AllowedEvents } from 'canvas-free-drawing';
import { Component, Emit, Prop, VModel, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'DrawInput'
})
export default class DrawInput extends Vue {
  @Prop({
    required: true,
    type: Number
  })
  readonly inputId!: number

  @VModel()
  image!: string

  saveTimer: ReturnType<typeof setTimeout> | null = null

  cfd: CanvasFreeDrawing | null = null

  get elementId (): string {
    return `draw_${this.inputId}`;
  }

  mounted (): void {
    this.cfd = new CanvasFreeDrawing({
      elementId: this.elementId,
      width: 500,
      height: 500,
    });

    if (this.image) {
      this.cfd.restore(this.image, () => {
        // eslint-disable-next-line no-console
        console.log('restored');
      });
    }
    this.cfd.setLineWidth(2);
    this.cfd.setStrokeColor([0, 0, 255]);
    this.listenDraw();
  }

  listenDraw (): void {
    if (!this.cfd) {
      return;
    }
    this.cfd.on({ event: AllowedEvents.redraw }, () => {
      if (this.saveTimer) {
        clearTimeout(this.saveTimer);
        this.saveTimer = null;
      }
      this.saveTimer = setTimeout(() => {
        this.save();
      }, 200);
    });
  }

  save (): void {
    if (!this.cfd) {
      return;
    }
    this.image = this.cfd.save();
  }

  @Emit()
  remove (): number {
    return this.inputId;
  }
}
</script>

<style scoped>
.border {
  border: 1px dotted black;
}
</style>
