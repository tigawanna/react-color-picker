import { type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, beforeEach, vi } from 'vitest';

import DefaultPicker from './fixtures/DefaultPicker';
import { DefaultColorPicker } from '~/index';
import write from './fixtures/write';
import swipe from './fixtures/swipe';

describe("Test <DefaultColorPicker />", () => {
  const container = document.createElement('div');
  Object.assign(container.style, { overflow: 'auto', minHeight: '100vh' });
  document.body.append(container);
  const render = (children: ReactNode ) => {
    createRoot(container).render(children);
  }

  beforeEach(() => {
    container.innerHTML = '';
  })

  it("renders in page", async () => {
    render(<DefaultColorPicker />);
    const input = await vi.waitUntil(() =>  container.querySelector('input')!, 150);
    expect(input).to.exist;
  });

  it("uses id, class, lang, placeholder, theme, color presets and keywords", async () => {
    render(<DefaultPicker
      id="my-id"
      className='my-class'
      lang="fr"
      theme="light"
      placeholder='Tapez la valeur de la couleur'
      colorPresets={{ hue: 120, hueSteps: 6, lightSteps: 10}}
      colorKeywords={[
        { default: 'red' },
        { magenta: 'magenta' },
        { olive: 'olive' },
        { yellow: 'yellow' },
        { textColor: 'currentColor' },
      ]}
    />);
    await vi.waitUntil(() => container.querySelector('input') !== null, 350);

    const input = container.querySelector('input')!;
    const colorMenu = container.querySelector('.color-dropdown')!;
    const toggleMenu = container.querySelector<HTMLButtonElement>('button.menu-toggle')!;
    expect(input?.parentElement?.className).to.contain('my-class');
    expect(input?.id).to.equal('my-id');
    expect(input?.placeholder).to.equal('Tapez la valeur de la couleur');
    expect(toggleMenu?.innerText).to.equal('Sélectionner la couleur');
    expect(colorMenu).to.exist;
  });

  it("simple presets single line", async () => {
    render(<DefaultPicker
      colorPresets={{ hue: 0, hueSteps: 1, lightSteps: 5}}
    />);
    await vi.waitUntil(() => container.querySelector('input') !== null, 350);

    const colorMenu = container.querySelector('.color-dropdown.menu')!;
    const presets = colorMenu.getElementsByTagName('LI');

    expect(colorMenu).to.exist;
    expect(presets.length).to.equal(5);
  });

  it("simple presets double line", async () => {
    render(<DefaultPicker
      colorPresets={{ hue: 0, hueSteps: 2, lightSteps: 5}}
    />);
    await vi.waitUntil(() => container.querySelector('input') !== null, 350);

    const colorMenu = container.querySelector('.color-dropdown.menu')!;
    const presets = colorMenu.getElementsByTagName('LI');

    expect(colorMenu).to.exist;
    expect(presets.length).to.equal(10);
  });

  it("simple presets triple line", async () => {
    render(<DefaultPicker
      colorPresets={{ hue: 0, hueSteps: 3, lightSteps: 5}}
    />);
    await vi.waitUntil(() => container.querySelector('input') !== null, 350);

    const colorMenu = container.querySelector('.color-dropdown.menu')!;
    const presets = colorMenu.getElementsByTagName('LI');

    expect(colorMenu).to.exist;
    expect(presets.length).to.equal(15);
  });

  it("simple presets multi line", async () => {
    render(<DefaultPicker
      colorPresets={{ hue: 0, hueSteps: 4, lightSteps: 5}}
    />);
    await vi.waitUntil(() => container.querySelector('input') !== null, 350);

    const colorMenu = container.querySelector('.color-dropdown.menu')!;
    const presets = colorMenu.getElementsByTagName('LI');

    expect(colorMenu).to.exist;
    expect(presets.length).to.equal(20);
  });

  it("uses an array of color keywords", async () => {
    render(<DefaultPicker
      colorKeywords={["red", "green", "blue"]}
    />);
    await vi.waitUntil(() => container.querySelector('input') !== null, 350);

    const colorMenu = container.querySelector('.color-dropdown.menu')!;
    const presets = colorMenu.getElementsByTagName('LI');

    expect(colorMenu).to.exist;
    expect(presets.length).to.equal(3);
  });

  it("uses language pack", async () => {
    render(<DefaultPicker
      format='rgb'
      locale={{
        "white": "weiß",
        "black": "schwarz",
        "grey": "grau",
        "red": "rot",
        "orange": "orange",
        "brown": "braun",
        "gold": "gold",
        "olive": "olivgrün",
        "yellow": "gelb",
        "lime": "limone",
        "green": "grün",
        "teal": "krickente",
        "cyan": "zyan",
        "blue": "blau",
        "violet": "violett",
        "magenta": "magenta",
        "pink": "rosa",
        "pickerLabel": "Farbauswahl",
        "appearanceLabel": "Farberscheinung",
        "valueLabel": "Farbwert",
        "toggleLabel": "Farbe auswählen",
        "placeholder": "Geben Sie den Farbwert im %-Format ein",
        "presetsLabel": "Farbvoreinstellungen",
        "defaultsLabel": "Farbstandards",
        "formatLabel": "Format",
        "alphaLabel": "Alpha",
        "hexLabel": "Hexadezimal",
        "hueLabel": "Farbton",
        "whitenessLabel": "Weißgrad",
        "blacknessLabel": "Schwarzgrad",
        "saturationLabel": "Sättigung",
        "lightnessLabel": "Helligkeit",
        "redLabel": "Rot",
        "greenLabel": "Grün",
        "blueLabel": "Blau"
      }}
    />);
    await vi.waitUntil(() => container.querySelector('input') !== null, 350);

    const input = container.querySelector('input')!;
    const pickerToggle = container.querySelector<HTMLButtonElement>('.picker-toggle')!;

    expect(pickerToggle?.innerText).to.equal('Farbauswahl. Format: RGB');
    expect(input?.placeholder).to.equal('Geben Sie den Farbwert im RGB-Format ein');
  });

  it('can show / hide `colorPicker` / `presetsMenu`', async function () {
    render(<>
      <a style={{zIndex: 1, opacity: 0.01, position: "absolute", top:0, right:0 }} href="#" id="myLink">My Link</a>
      <DefaultPicker
        colorPresets={{ hue: 120, hueSteps: 6, lightSteps: 10}}
        colorKeywords={[
          { default: 'red' },
          { magenta: 'magenta' },
          { olive: 'olive' },
          { yellow: 'yellow' },
          { textColor: 'currentColor' },
        ]}
      />
    </>);
    await vi.waitUntil(() => container.querySelector('input') !== null, 350);

    const input = container.querySelector<HTMLInputElement>('input')!;
    const pickerToggle = container.querySelector<HTMLButtonElement>('.picker-toggle')!;
    const menuToggle = container.querySelector<HTMLButtonElement>('.menu-toggle')!;
    const colorPicker =  container.querySelector<HTMLDivElement>('.color-dropdown.picker')!;
    const colorMenu = container.querySelector<HTMLDivElement>('.color-dropdown.menu')!;
    const myLink = container.querySelector<HTMLAnchorElement>('#myLink')!;

    pickerToggle.click();
    await vi.waitFor(() => expect(colorPicker.className).to.contain('show'), 350);

    input.dispatchEvent(new KeyboardEvent('keyup', { code: 'Escape', bubbles: true }));
    await vi.waitFor(() => expect(colorPicker.className).to.not.contain('show'), 350);

    menuToggle.click();
    await vi.waitFor(() => expect(colorMenu.className).to.contain('show'), 350);
    
    input.dispatchEvent(new KeyboardEvent('keyup', { code: 'Escape', bubbles: true }));
    await vi.waitFor(() => expect(colorMenu.className).to.not.contain('show'), 350);

    write(pickerToggle, "Space");
    await vi.waitFor(() => expect(colorPicker.className).to.contain('show'), 350);

    write(menuToggle, 'Enter');
    await vi.waitFor(() => {
      expect(colorPicker.className).to.not.contain('show');
      expect(colorMenu.className).to.contain('show');
    }, 350);

    write(menuToggle, 'Space');
    await vi.waitFor(() => expect(colorMenu.className).to.not.contain('show'), 350);

    pickerToggle.click();
    // await new Promise((res) => setTimeout(res, 150));
    await vi.waitFor(() => {
      expect(input).to.equal(document.activeElement);
      expect(colorPicker.className).to.contain('show');
    }, 350);

    input.dispatchEvent(new Event('blur', { bubbles: true }));
    myLink.focus();
    myLink.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    await vi.waitFor(() => expect(colorPicker.className).to.not.contain('show'), 350);
  });

  it('can do some keyboard events', async () => {
    render(<DefaultPicker />);
    await vi.waitUntil(() => container.querySelector<HTMLInputElement>('input') !== null, 350);

    const input = container.querySelector<HTMLInputElement>('input')!;
    const pickerToggle = container.querySelector<HTMLButtonElement>('.picker-toggle')!;
    const colorPicker = container.querySelector<HTMLDivElement>('.color-dropdown.picker')!;

    pickerToggle.click();
    await vi.waitFor(() => expect(colorPicker.className).to.contain('show'), 350);

    write(input, 'transparentEnter');
    await vi.waitFor(() => expect(input.value).to.equal("rgba(0, 0, 0, 0)"), 150);

    write(input, 'blackEnter');
    await vi.waitFor(() => expect(input.value).to.equal('rgb(0, 0, 0)'), 150);

    write(input, 'hsl 0 0 100Enter');
    await vi.waitFor(() => {
      expect(input.value).to.equal("rgb(255, 255, 255)");
      expect(input.value).to.not.equal('hsl 0 0 100');
    }, 150);
  });

  it('can do `pointer` event listeners', async () => {
    render(<DefaultPicker onChange={(newValue) => expect(newValue).to.have.length} />);
    await vi.waitUntil(() => container.querySelector<HTMLInputElement>('input') !== null, 350);

    const input = container.querySelector<HTMLInputElement>('input')!;
    const pickerToggle = container.querySelector<HTMLButtonElement>('.picker-toggle')!;
    const colorPicker = container.querySelector<HTMLDivElement>('.color-dropdown.picker')!;
    const visuals = [...colorPicker.getElementsByClassName('visual-control')] as [HTMLElement, HTMLElement, HTMLElement];

    pickerToggle.click();
    await vi.waitFor(() => expect(colorPicker.className).to.include('show'), 350);

    write(input, 'greenEnter');
    await vi.waitFor(() => expect(input.value).to.equal('rgb(0, 128, 0)'), 150);
    let lastRgb = input.value;

    swipe(visuals[0], [[5, 5], [-5, -5], [500, 500], [100, 100], [100, 100]]);
    await vi.waitFor(() => expect(input.value).to.not.equal(lastRgb), 350);
    lastRgb = input.value;

    swipe(visuals[1], [[5, 5], [5, 0], [5, -5], [5, 500], [5, 100], [5, 100]]);
    await vi.waitFor(() => expect(input.value).to.not.equal(lastRgb), 150);
    lastRgb = input.value;

    swipe(visuals[2], [[5, 5], [5, -5], [5, 200], [5, 500], [5, 100], [5, 100]]);
    await vi.waitFor(() => expect(input.value).to.not.equal(lastRgb), 150);
  });

  it('uses `keyboard` event listeners', async () => {
    render(<DefaultPicker
      colorPresets={{ hue: 120, hueSteps: 2, lightSteps: 10}}
      colorKeywords={[
        { blue: 'rgb(0, 0, 255)' },
        { transparent: 'rgba(0, 0, 0, 0)' },
        { textColor: 'currentColor' },
        { empty: 'empty' },
        { default: 'red' },
      ]}
    />);
    await vi.waitUntil(() => container.querySelector('input') !== null, 350);

    const input = container.querySelector<HTMLInputElement>('input')!;
    const pickerToggle = container.querySelector<HTMLButtonElement>('.picker-toggle')!;
    const menuToggle = container.querySelector<HTMLButtonElement>('.menu-toggle')!;
    const colorPicker = container.querySelector<HTMLDivElement>('.color-dropdown.picker')!;
    const colorMenu = container.querySelector<HTMLDivElement>('.color-dropdown.menu')!;
    const defaults = colorMenu.children[1]!.getElementsByTagName('LI') as HTMLCollectionOf<HTMLLIElement>;
    const options = colorMenu.children[0]!.getElementsByTagName('LI') as HTMLCollectionOf<HTMLLIElement>;

    pickerToggle.click();
    await vi.waitFor(() => expect(colorPicker.className).to.include('show'), 350);

    write(input, "whiteEscape");
    await vi.waitFor(() => {
      expect(input.value).to.not.equal("white");
      expect(input.value).to.not.equal("rgb(255, 255, 255)");
    }, 250);

    menuToggle.click();
    await vi.waitFor(() => expect(colorMenu.className).to.contain('show'), 350);
    defaults[0]!.focus();
    defaults[0]!.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight', code: 'ArrowRight' }));
    await vi.waitFor(() => expect(defaults[1]).to.equal(document.activeElement), 150);

    defaults[1]!.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowLeft', code: 'ArrowLeft' }));
    await vi.waitFor(() => expect(defaults[0]).to.equal(document.activeElement), 150);

    defaults[0]!.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown', code: 'ArrowDown' }));
    await vi.waitFor(() => expect(defaults[1]).to.equal(document.activeElement), 150);

    defaults[1]!.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowUp', code: 'ArrowUp' }));
    await vi.waitFor(() => expect(defaults[0]).to.equal(document.activeElement), 150);

    let prevValue = input.value;
    defaults[0]!.click();
    await vi.waitFor(() => {
      expect(defaults[0]!.className).to.contain('active');
      expect(input.value).to.not.equal(prevValue);
    }, 150);

    const transparent = colorMenu.querySelector<HTMLLIElement>('[data-value="transparent"]');
    if (transparent) {
      transparent.click();
      prevValue = input.value;

      await vi.waitFor(() => {
        expect(transparent.className).to.contain('active');
        expect(input.value).to.equal('rgba(0, 0, 0, 0)');
      }, 150);
    }

    const empty = colorMenu.querySelector<HTMLLIElement>('[data-value="empty"]');
    if (empty) {
      empty.click();
      prevValue = input.value;
      await vi.waitFor(() => {
        expect(empty.className).to.contain('active');
        expect(input.value).to.not.equal('empty');
        expect(input.value).to.equal('rgb(0, 0, 0)');
      }, 150);
    }

    options[0]!.focus();
    options[0]!.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight', code: 'ArrowRight' }));
    await vi.waitFor(() => expect(options[1]).to.equal(document.activeElement), 150);

    options[1]!.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowLeft', code: 'ArrowLeft' }));
    await vi.waitFor(() => expect(options[0]).to.equal(document.activeElement), 150);

    options[0]!.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown', code: 'ArrowDown' }));
    await vi.waitFor(() => expect(options[10]).to.equal(document.activeElement), 150);

    options[10]!.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowUp', code: 'ArrowUp' }));
    await vi.waitFor(() => expect(options[0]).to.equal(document.activeElement), 150);

    prevValue = input.value;
    options[0]!.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter', code: 'Enter' }));
    await vi.waitFor(() => {
      expect(options[0]!.className).to.contain('active');
      expect(input.value).to.not.equal(prevValue);
    }, 150);

    prevValue = input.value;
    options[1]!.click();
    await vi.waitFor(() => {
      expect(options[1]!.className).to.contain('active');
      expect(input.value).to.not.equal(prevValue);
    }, 150);

    document.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, code: 'Escape' }))
    await vi.waitFor(() => expect(colorMenu.className).to.not.contain('show'), 350);
  });

  it('uses `scroll` event listeners', async () => {
    render(<DefaultPicker
      colorPresets={{ hue: 120, hueSteps: 2, lightSteps: 10}}
      colorKeywords={[
        { blue: 'rgb(0, 0, 255)' },
        { transparent: 'rgba(0, 0, 0, 0)' },
        { textColor: 'currentColor' },
        { empty: 'empty' },
        { default: 'red' },
      ]}
    />);
    await vi.waitUntil(() => container.querySelector('input') !== null, 350);

    const input = container.querySelector<HTMLInputElement>('input')!;
    const pickerToggle = container.querySelector<HTMLButtonElement>('.picker-toggle')!;
    const colorPicker = container.querySelector<HTMLDivElement>('.color-dropdown.picker')!;

    Object.assign(input.parentElement!.style, { margin: '750px 0' });
    const win = input.ownerDocument.defaultView!;

    pickerToggle.click();
    await vi.waitFor(() => expect(colorPicker.className).to.contain('show'), 350);

    win.scrollTo({ left: 0, top: 10, behavior: "smooth" });
    win.dispatchEvent(new Event('scroll'));
    await vi.waitFor(() => expect(colorPicker.className).to.contain('top'), 750);

    win.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    win.dispatchEvent(new Event('scroll'));
    await vi.waitFor(() => expect(colorPicker.className).to.not.contain('top'), 750);
  });

  it('uses visual controls and knobs', async () => {
    render(<DefaultPicker
      colorPresets={{ hue: 120, hueSteps: 2, lightSteps: 10}}
      colorKeywords={[
        { blue: 'rgb(0, 0, 255)' },
        { transparent: 'rgba(0, 0, 0, 0)' },
        { textColor: 'currentColor' },
        { empty: 'empty' },
        { default: 'red' },
      ]}
    />);
    await vi.waitUntil(() => container.querySelector('input') !== null, 350);

    const input = container.querySelector<HTMLInputElement>('input')!;
    const pickerToggle = container.querySelector<HTMLButtonElement>('.picker-toggle')!;
    const colorPicker = container.querySelector<HTMLDivElement>('.color-dropdown.picker')!;
    const visuals = [...colorPicker.getElementsByClassName('visual-control')] as [HTMLElement, HTMLElement, HTMLElement];
    const knobs = [...colorPicker.getElementsByClassName('knob')] as [HTMLElement, HTMLElement, HTMLElement];

    pickerToggle.click();
    await vi.waitFor(() => expect(colorPicker.className).to.contain('show'), 350);

    // test visuals click, but we're using pointerdown more reliably
    write(input, "hsl 0 100 50 Enter");
    await new Promise((res) => setTimeout(res, 34));
    const v0rect = visuals[0].getBoundingClientRect();
    visuals[0].dispatchEvent(new PointerEvent('pointerdown', {
      bubbles: true, cancelable: true,
      clientX: v0rect.left + v0rect.width / 2,
      clientY: v0rect.top + v0rect.height / 2,
    }));
    await vi.waitFor(() => expect(input.value).to.not.equal('rgb(255, 0, 0)'), 350);

    write(input, "hsl 300 100 50 Enter");
    await new Promise((res) => setTimeout(res, 34));
    const v1rect = visuals[1].getBoundingClientRect();
    visuals[1].dispatchEvent(new PointerEvent('pointerdown', {
      bubbles: true, cancelable: true,
      clientX: v1rect.left + v1rect.width / 2,
      clientY: v1rect.top + v1rect.height / 2,
    }));
    await vi.waitFor(() => expect(input.value).to.not.equal("rgb(255, 0, 255)"), 350);

    write(input, "hsl 120 100 50 Enter");
    await new Promise((res) => setTimeout(res, 34));
    const v2rect = visuals[2].getBoundingClientRect();
    console.log(input.value)
    visuals[2].dispatchEvent(new PointerEvent('pointerdown', {
      bubbles: true, cancelable: true,
      clientX: v2rect.left + v2rect.width / 2,
      clientY: v2rect.top + v2rect.height / 2,
    }));
    
    await vi.waitFor(() => expect(input.value).to.equal("rgba(0, 255, 0, 0.5)"), 350);

    // test control knobs pointer events
    write(input, "hsl 0 100 100 Enter");
    swipe(knobs[0], [[2, 2], [-v0rect.left, -v0rect.top], [300, 300], [v0rect.width / 2, v0rect.height / 2]], { x: v0rect.left, y: v0rect.top });
    await vi.waitFor(() => expect(input.value).to.not.equal("rgb(255, 0, 0)"), 350);

    write(input, "hsl 0 100 100 Enter");
    swipe(knobs[1], [[2, 2], [-v1rect.left, -v1rect.top], [2, 300], [v1rect.width / 2, v1rect.height / 2]], { x: v1rect.left, y: v1rect.top });
    await vi.waitFor(() => expect(input.value).to.not.equal("rgb(255, 0, 0)"), 350);

    write(input, "hsl 0 100 100 Enter");
    swipe(knobs[2], [[2, 2], [-v2rect.left, -v2rect.top], [2, 300], [v2rect.width / 2, v2rect.height / 2]], { x: v2rect.left, y: v2rect.top });
    await vi.waitFor(() => expect(input.value).to.not.equal("rgb(255, 0, 0)"), 350);

    // test control knobs keyboard events
    write(input, 'hsl 300 100 50 Enter');
    let currentRgb = input.value;
    knobs[0].focus();
    knobs[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowDown", code: 'ArrowDown' }));
    knobs[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowDown", code: 'ArrowDown' }));
    knobs[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "a", code: 'a' })); // adge case, produces no effect
    knobs[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight", code: 'ArrowRight' }));
    knobs[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight", code: 'ArrowRight' }));
    knobs[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowLeft", code: 'ArrowLeft' }));
    await vi.waitFor(() => expect(input.value).to.not.equal(currentRgb), 350);

    write(input, 'hsl 180 100 50 Enter');
    currentRgb = input.value;
    knobs[1].focus();
    knobs[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowDown", code: 'ArrowDown' }));
    knobs[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowDown", code: 'ArrowDown' }));
    knobs[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "b", code: 'b' }));
    knobs[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight", code: 'ArrowRight' }));
    knobs[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight", code: 'ArrowRight' }));
    knobs[1].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowLeft", code: 'ArrowLeft' }));
    await vi.waitFor(() => expect(input.value).to.not.deep.equal(currentRgb), 350);

    write(input, 'hsl 0 100 50');
    currentRgb = input.value;
    knobs[2].focus();
    knobs[2].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowDown", code: 'ArrowDown' }));
    knobs[2].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowDown", code: 'ArrowDown' }));
    knobs[2].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "b", code: 'c' }));
    knobs[2].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight", code: 'ArrowRight' }));
    knobs[2].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight", code: 'ArrowRight' }));
    knobs[2].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowLeft", code: 'ArrowLeft' }));
    await vi.waitFor(() => expect(input.value).to.not.deep.equal(currentRgb), 350);
  });

  const colorNameValues = ['#fff', '#000', '#808080', '#f00', '#ffa500', '#653c24', '#c8af00', '#808000', '#ff0', '#0f0', '#080', '#075', '#0ff', '#05f', '#a7f', '#b0f', '#f0d'];
  const colorNamesFrench = 'blanc,noir,gris,rouge,orange,marron,or,olive,jaune,citron,vert,sarcelle,cyan,bleu,violet,magenta,rose';
  const frenchColors = colorNamesFrench.split(',');
  for (let i = 0; i< frenchColors.length; i += 1) {
    const color = frenchColors[i];
    it(`shows color appearance ${color}`, async () => {
      render(<DefaultPicker
        // colorPresets={colorPresets}
        colorKeywords={['olive', 'green', 'red', 'transparent']}
        lang="fr"
      />);
      await vi.waitUntil(() => container.querySelector('input') !== null, 350);

      const input = container.querySelector<HTMLInputElement>('input')!;
      const pickerToggle = container.querySelector<HTMLButtonElement>('.picker-toggle')!;
      const colorPicker = container.querySelector<HTMLDivElement>('.color-dropdown.picker')!;
      const knobs = [...colorPicker.getElementsByClassName('knob')] as [HTMLElement, HTMLElement, HTMLElement];

      const webcolor = colorNameValues[frenchColors.indexOf(color)];

      pickerToggle.click();
      await vi.waitFor(() => expect(colorPicker.className).to.contain('show'), 350);
      write(input, webcolor + "Enter");
      await vi.waitFor(() => expect(knobs[1].getAttribute('aria-description')).to.include(color), 350);
    });
  }

  const FORMAT = ['hsl', 'rgb', 'hwb', 'hex'];
  for (let i = 0; i< FORMAT.length; i += 1) {
    const format = FORMAT[i];
    it(`uses format - ${format.toUpperCase()}`, async () => {
      render(<DefaultPicker
        // colorPresets={colorPresets}
        format={format as any}
        colorKeywords={['olive', 'green', 'red', 'transparent']}
      />);
      await vi.waitUntil(() => container.querySelector('input') !== null, 350);
  
      const input = container.querySelector<HTMLInputElement>('input')!;
      const pickerToggle = container.querySelector<HTMLButtonElement>('.picker-toggle')!;
      const colorPicker = container.querySelector<HTMLDivElement>('.color-dropdown.picker')!;
      const inputs = [...colorPicker.getElementsByClassName('color-input')] as [HTMLInputElement, HTMLInputElement, HTMLInputElement, HTMLInputElement];

      pickerToggle.click();
      await vi.waitFor(() => expect(colorPicker.className).to.contain('show'), 350);
      let rgb = input.value;

      // Test typing a valid value and press `Enter`
      write(input, 'hsl 0 100 50 Enter');
      await vi.waitFor(() => {
        if (format === 'hsl') {
          expect(input.value).to.be.equal('hsl(0, 100%, 50%)');
        } else if (format === 'rgb') {
          expect(input.value).to.be.equal('rgb(255, 0, 0)');
        } else if (format === 'hex') {
          expect(input.value).to.be.equal('#ff0000');
        } else if (format === 'hwb') {
          expect(input.value).to.be.equal('hwb(0deg 0% 0%)');
        }
      }, 350);

      // Test keyboard event listeners on `inputs`
      if (format === 'hex') {
        write(input, "hsl 300 100 50 Enter");
        await new Promise((res) => setTimeout(res, 150));
        rgb = input.value;
        write(inputs[0], 'hsl 100 100 50 Enter');
        await vi.waitFor(() => expect(input.value).to.not.equal(rgb), 350);
      } else if (format === 'rgb') {
        write(input, "hsl 300 100 50 Enter");
        await new Promise((res) => setTimeout(res, 350));
        rgb = input.value;
        write(inputs[0], '150Enter');
        await vi.waitFor(() => expect(input.value).to.not.equal(rgb), 350);
        
        write(input, "hsl 100 100 50 Enter");
        await new Promise((res) => setTimeout(res, 150));
        rgb = input.value;
        write(inputs[1], '150Enter');
        await vi.waitFor(() => expect(input.value).to.not.equal(rgb), 350);
        
        write(input, "hsl 300 100 50 Enter");
        await new Promise((res) => setTimeout(res, 150));
        rgb = input.value;
        write(inputs[2], '150Enter');
        await vi.waitFor(() => expect(input.value).to.not.equal(rgb), 350);
        
      } else if (format === 'hsl' || format === 'hwb') {
        write(input, "hsl 270 100 50 Enter");
        await new Promise((res) => setTimeout(res, 350));
        rgb = input.value;
        write(inputs[0], '0Enter');
        await vi.waitFor(() => expect(input.value).to.not.equal(rgb), 350);
        
        write(input, "hsl 330 100 50 Enter");
        await new Promise((res) => setTimeout(res, 150));
        rgb = input.value;
        write(inputs[1], '50Enter');
        await vi.waitFor(() => expect(input.value).to.not.equal(rgb), 350);
        
        write(input, "hsl 300 100 50 Enter");
        await new Promise((res) => setTimeout(res, 150));
        rgb = input.value;
        write(inputs[2], '25Enter');
        await vi.waitFor(() => expect(input.value).to.not.equal(rgb), 350);
      }
      
      if (format !== 'hex') {
        write(input, "hsl 240 100 50 Enter");
        await new Promise((res) => setTimeout(res, 150));
        rgb = input.value;
        write(inputs[3], '25Enter');
        await vi.waitFor(() => expect(input.value).to.not.equal(rgb), 350);
      }
    });
  }
});