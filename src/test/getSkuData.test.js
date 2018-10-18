import SkuApi from 'api/getSkuData';

const skuApi = new SkuApi();
test('skuapi has items', () => {
  expect(Array.isArray(skuApi.items)).toBe(true);
});

test('skuapi has payload method', () => {
  expect(skuApi.payload).toEqual(expect.any(Function));
});

test('skuapi payload returns object', () => {
  expect(typeof skuApi.payload()).toBe('object');
});

test('skuapi payload object has values', () => {
  const payload = skuApi.payload();
  expect(typeof payload.url).toBe('string');
  expect(payload.url).toBe('https://www.officedepot.com/mobile/getAjaxPriceListFromService.do?items=341661,515408,291749,2422871,372704,621038,162359,144333&mapBySkuId=true&pr=');
  expect(payload.merge).toBe(true);
  expect(typeof payload.store).toBe('string');
  expect(payload.store).toBe('skuData');
});
