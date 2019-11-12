import { pegaTamanhoFinal } from './crop-helper.js'

test('wrapper quadrado, crop quadrado', () => {

    var wrapper = { width: 400, height: 400 }
    var crop = { width: 30, height: 30 }

    var { width, height } = pegaTamanhoFinal(crop, wrapper);

    expect(width).toBe(400);
    expect(height).toBe(400);

});

test('wrapper quadrado, crop largura maior que altura', () => {

    var wrapper = { width: 400, height: 400 }
    var crop = { width: 30, height: 15 }

    var { width, height } = pegaTamanhoFinal(crop, wrapper);

    expect(width).toBe(400);
    expect(height).toBe(200);

});

test('wrapper quadrado, crop largura maior que altura, largura igual wrapper', () => {

    var wrapper = { width: 400, height: 400 }
    var crop = { width: 400, height: 200 }

    var { width, height } = pegaTamanhoFinal(crop, wrapper);

    expect(width).toBe(400);
    expect(height).toBe(200);

});

test('wrapper quadrado, crop largura menor que altura', () => {

    var wrapper = { width: 400, height: 400 }
    var crop = { width: 15, height: 30 }

    var { width, height } = pegaTamanhoFinal(crop, wrapper);

    expect(width).toBe(200);
    expect(height).toBe(400);
});



test('wrapper largura maior que altura, crop quadrado', () => {

    var wrapper = { width: 500, height: 400 }
    var crop = { width: 30, height: 30 }

    var { width, height } = pegaTamanhoFinal(crop, wrapper);

    expect(width).toBe(400);
    expect(height).toBe(400);

});
