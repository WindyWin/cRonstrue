import "mocha";
import { assert } from "chai";
import cronstrue from "../src/cronstrue-i18n";

describe("Cronstrue (vi)", function () {
  before(function () {
    cronstrue.defaultLocale = "vi";
  });

  describe("every", function () {
    it("* * * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Mỗi giây");
    });

    it("* * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Mỗi phút");
    });

    it("*/1 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Mỗi phút");
    });

    it("*/8 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Mỗi 8 phút");
    });

    it("0 0 * * * ?", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Mỗi giờ");
    });
  });

  describe("on the", function () {
    it("0 0 * * MON#1", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Vào 00:00, vào lần đầu tiên Thứ 2 của tháng");
      // acutally it should be "Vào 00:00, vào Thứ 2 lần đầu tiên của tháng" gonna be sound more natural above is acceptable
    });

    it("0 0 * * MON#2", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Vào 00:00, vào lần thứ 2 Thứ 2 của tháng");
      // acutally it should be "Vào 00:00, vào Thứ 2 lần thứ 2 của tháng" gonna be sound more natural above is acceptable
    });
  });

  describe("only on", function () {
    it("0 0 * * MON", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Vào 00:00, chỉ vào Thứ 2");
    });
  });

  describe("and on", function () {
    it("0 0 1 * MON", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Vào 00:00, vào ngày 1 của tháng, và vào Thứ 2");
    });
  });

  describe("last day of month", function () {
    it("0 0 L * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Vào 00:00, vào ngày cuối cùng của tháng");
    });
  });

  describe("last weekday of month", function () {
    it("0 0 LW * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Vào 00:00, vào ngày cuối tuần của tháng");
    });
  });

  describe("last day of week of month", function () {
    it("0 0 * * 2L", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Vào 00:00, vào ngày Thứ 3 cuối cùng của tháng");
    });
  });

  describe("specified time", function () {
    it("10 14 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Vào 14:10");
    });
  });

  describe("minutes range", function () {
    it("5-20 * * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Mỗi phút từ phút 5 đến phút 20 hàng giờ");
    });
    it("5-20 2 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Mỗi phút từ 02:05 đến 02:20");
    });
    it("5-20/20 2-5 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Mỗi phút từ 02:05 đến 02:20");
    });
  });

  describe("months range", function () {
    it("0 0 1 JAN-JUN *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Vào 00:00, vào ngày 1 của tháng, Tháng 1 đến Tháng 6");
    });
  });

  describe("multiple days", function () {
    it("0 0 * * MON,WED,FRI", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Vào 00:00, chỉ vào Thứ 2, Thứ 4, và Thứ 6");
    });
  });

  describe("every X hours", function () {
    it("0 */4 * * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Vào đầu giờ, mỗi 4 tiếng");
    });
  });
  describe("specific day of month", function () {
    it("0 0 15 * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Vào 00:00, vào ngày 15 của tháng");
    });
  });

  describe("range of days of month", function () {
    it("0 0 1-5 * *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Vào 00:00, từ ngày 1 đến 5 trong tháng");
    });
    it("0 0 1-5 2 *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Vào 00:00, từ ngày 1 đến 5 trong tháng, chỉ trong Tháng 2");
    });
  });

  describe("range of months", function () {
    it("0 0 1-5 2-5 *", function () {
      assert.equal(cronstrue.toString(this.test?.title as string), "Vào 00:00, từ ngày 1 đến 5 trong tháng, Tháng 2 đến Tháng 5");
    });
  });

});
