import Animation from '../lib/animation';
import Stack from '../lib/stack';

fdescribe('animation', () => {

    test('should not call start if not items', () => {
        document.body.innerHTML = `
        `
        spyOn(Stack.prototype, 'start');
        const animation = new Animation('.fade');
        animation.animateItems(0);
        expect(Stack.prototype.start).not.toHaveBeenCalled();
    });

    test('should get items and call start', () => {
        document.body.innerHTML = `
            <div class="fade"></div>
        `
        spyOn(Stack.prototype, 'start');
        const animation = new Animation('.fade');
        animation.animateItems(0);
        expect(Stack.prototype.start).toHaveBeenCalled();
    });
})