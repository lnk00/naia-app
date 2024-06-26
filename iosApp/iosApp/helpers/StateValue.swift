import Foundation
import Shared
import SwiftUI

@propertyWrapper struct StateValue<T: AnyObject>: DynamicProperty {
    @ObservedObject
    private var obj: ObservableValue<T>

    var wrappedValue: T {
        obj.value
    }

    init(_ value: Value<T>) {
        obj = ObservableValue(value)
    }
}