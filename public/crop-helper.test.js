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

test('wrapper largura maior que altura, crop quadrado maior que o wrapper', () => {

    var wrapper = { width: 500, height: 400 }
    var crop = { width: 3000, height: 3000 }

    var { width, height } = pegaTamanhoFinal(crop, wrapper);

    expect(width).toBe(400);
    expect(height).toBe(400);

});

test('wrapper largura maior que altura, crop largura maior que altura, proporcional ao wrapper', () => {

    var wrapper = { width: 500, height: 400 }
    var crop = { width: 50, height: 40 }

    var { width, height } = pegaTamanhoFinal(crop, wrapper);

    expect(width).toBe(500);
    expect(height).toBe(400);

});

test('wrapper largura maior que altura, crop largura maior que altura, proporcional, maior que o wrapper', () => {

    var wrapper = { width: 500, height: 400 }
    var crop = { width: 5000, height: 4000 }

    var { width, height } = pegaTamanhoFinal(crop, wrapper);

    expect(width).toBe(500);
    expect(height).toBe(400);

});

test('wrapper largura maior que altura, crop largura maior que altura, desproporcional, maior que o wrapper', () => {

    var wrapper = { width: 500, height: 400 }
    var crop = { width: 5000, height: 2500 }

    var { width, height } = pegaTamanhoFinal(crop, wrapper);

    expect(width).toBe(500);
    expect(height).toBe(250);
});

test('wrapper largura menor que altura, crop quadrado', () => {

    var wrapper = { width: 400, height: 500 }
    var crop = { width: 30, height: 30 }

    var { width, height } = pegaTamanhoFinal(crop, wrapper);

    expect(width).toBe(400);
    expect(height).toBe(400);
});

test('wrapper largura menor que altura, crop quadrado, maior que o wrapper', () => {

    var wrapper = { width: 400, height: 500 }
    var crop = { width: 3000, height: 3000 }

    var { width, height } = pegaTamanhoFinal(crop, wrapper);

    expect(width).toBe(400);
    expect(height).toBe(400);
});

test('wrapper largura menor que altura, crop largura menor que altura, proporcional ao wrapper', () => {

    var wrapper = { width: 400, height: 500 }
    var crop = { width: 40, height: 50 }

    var { width, height } = pegaTamanhoFinal(crop, wrapper);

    expect(width).toBe(400);
    expect(height).toBe(500);
});


test('wrapper largura menor que altura, crop largura menor que altura, proporcional maior que o wrapper', () => {

    var wrapper = { width: 400, height: 500 }
    var crop = { width: 4000, height: 5000 }

    var { width, height } = pegaTamanhoFinal(crop, wrapper);

    expect(width).toBe(400);
    expect(height).toBe(500);
});