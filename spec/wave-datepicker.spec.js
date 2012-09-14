
describe('Wave Datepicker', function() {
  beforeEach(function() {
    this.$input = $('<input id="Date">').appendTo(document.body);
    this.stubWaveDatepicker = function() {
      this._WaveDatepicker = {
        render: sinon.stub(),
        destroy: sinon.stub()
      };
      this._WaveDatepicker.render.returns(this._WaveDatepicker);
      this._WaveDatepickerStub = sinon.stub(WDP, 'WaveDatepicker');
      return this._WaveDatepickerStub.returns(this._WaveDatepicker);
    };
    return this.restoreWaveDatepicker = function() {
      return this._WaveDatepickerStub.restore();
    };
  });
  afterEach(function() {
    this.$input.datepicker('destroy');
    return this.$input.remove();
  });
  return describe('$.fn.datepicker', function() {
    it('should be defined on jQuery object', function() {
      return expect(this.$input.datepicker).toEqual(jasmine.any(Function));
    });
    it('should instantiate the WaveDatepicker call', function() {
      this.stubWaveDatepicker();
      this.$input.datepicker();
      expect(this._WaveDatepickerStub).toHaveBeenCalledOnce();
      return this.restoreWaveDatepicker();
    });
    it('should not instantiate datepicker twice on same element', function() {
      this.stubWaveDatepicker();
      this.$input.datepicker();
      this.$input.datepicker();
      expect(this._WaveDatepickerStub).toHaveBeenCalledOnce();
      return this.restoreWaveDatepicker();
    });
    it('should set the datepicker widget as data on the <input>', function() {
      this.stubWaveDatepicker();
      this.$input.datepicker();
      expect(this.$input.data('datepicker')).toEqual(this._WaveDatepicker);
      return this.restoreWaveDatepicker();
    });
    it('should use the value attribute to set default date', function() {
      var date;
      this.$input.val('2012-08-01').datepicker();
      date = this.$input.data('datepicker').date;
      expect(date).toBeDefined();
      expect(date.getFullYear()).toEqual(2012);
      expect(date.getMonth()).toEqual(7);
      return expect(date.getDate()).toEqual(1);
    });
    it('should set today as the default is value not set on <input>', function() {
      var date, today;
      this.$input.datepicker();
      date = this.$input.data('datepicker').date;
      today = new Date();
      expect(date).toBeDefined();
      expect(date.getFullYear()).toEqual(today.getFullYear());
      expect(date.getMonth()).toEqual(today.getMonth());
      return expect(date.getDate()).toEqual(today.getDate());
    });
    return describe('Shortcuts', function() {
      return it('should by default provide the Today shortcut', function() {
        var today, widget;
        this.$input.datepicker();
        widget = this.$input.data('datepicker');
        expect(widget.$datepicker).toContain('.wdp-shortcut');
        today = widget.$datepicker.find('.wdp-shortcut');
        return expect($.trim(today.text())).toEqual('Today');
      });
    });
  });
});
